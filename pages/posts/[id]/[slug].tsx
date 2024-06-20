import { Post, PostService } from "danielbonifacio-sdk-2";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ResourceNotFoundError } from "danielbonifacio-sdk-2/dist/errors";
import Head from "next/head";
import PostHeader from "../../../components/PostHeader";
import Markdown from "../../../components/Markdown";
import { DiscussionEmbed } from "disqus-react";
import { url } from "inspector";

interface PostProps extends NextPageProps {
    post?: Post.Detailed;
    host?: string;
}

export default function PostPage(props: PostProps) {
    const { post } = props;
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`http://${props.host}/posts/${props.post?.id}/${props.post?.slug}`}
                />
                <meta property="og:title" content={props.post?.title} />
                <meta property="og:site_name" content="AlgaNews" />
                <meta property="og:url" content="alganews.com.br" />
                <meta property="og:description" content={props.post?.body.slice(0, 54)} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={props.post?.imageUrls.medium}></meta>
                <title>{props.post?.title} - AlgaNews</title>
            </Head>
            {post && (
                <>
                    <PostHeader
                        thumbnail={post?.imageUrls.large}
                        createdAt={post?.createdAt}
                        editor={post?.editor}
                        title={post?.title}
                    />
                    <Markdown>{post.body}</Markdown>
                    <DiscussionEmbed
                        shortname="alganews-18"
                        config={{
                            url: `http://${props.host}/posts/${props.post?.id}/${props.post?.slug}`,
                            identifier: String(props.post?.id),
                            title: props.post?.title,
                            language: "pt_BR"
                        }}
                    />
                </>
            )}
        </>
    );
}

interface Params extends ParsedUrlQuery {
    id: string;
    slug: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
    async ({ params, res, req }) => {
        try {
            if (!params) return { notFound: true };

            const { id, slug } = params;
            const postId = Number(id);

            if (isNaN(postId)) return { notFound: true };

            const post = await PostService.getExistingPost(postId);

            return {
                props: {
                    post,
                    host: req.headers.host,
                },
            };
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                return { notFound: true };
            }
            return {
                props: {
                    error: {
                        //@ts-ignore
                        message: error.message,
                        //@ts-ignore
                        statusCode: error.data?.status || 500,
                    },
                },
            };
        }
    };