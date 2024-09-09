import { DiscussionEmbed } from "disqus-react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import PostHeader from "../../../components/PostHeader";
import Markdown from "../../../components/Markdown";
import { Post, PostService } from "danielbonifacio-sdk";
import { ResourceNotFoundError } from "danielbonifacio-sdk-2";

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
  host?: string;
}

export default function PostPage(props: PostProps) {
  const { post } = props;
  return (
    <>
      <Head>
        <meta property="og:title" content={post?.title} />
        <meta property="og:site_name" content="AlgaNews" />
        <meta property="og:url" content="alganews.com.br" />
        <meta property="og:description" content={post?.body.slice(0, 54)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post?.imageUrls.medium} />
        <title>{post?.title} - AlgaNews</title>
        <link
          rel="canonical"
          href={`http://${props.host}/${props.post?.id}/${props.post?.slug}`}
        />
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
            shortname="alganews"
            config={{
              url: `http://${props.host}/${props.post?.id}/${props.post?.slug}`,
              identifier: String(post.id),
              title: post.title,
              language: "pt_BR",
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
  async ({ params, res, req, query }) => {
    try {
      if (!params) return { notFound: true };

      const { id, slug } = params;
      const postId = Number(id);

      const { token } = query;

      if (isNaN(postId)) return { notFound: true };

      const post = await PostService.getExistingPost(postId, token as string);

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

      if (error instanceof Error) {
        return {
          props: {
            error: {
              message: error.message,
              statusCode: (error as any).data?.status || 500,
            },
          },
        };
      }

      return {
        props: {
          error: {
            message: 'Unknown error occurred',
            statusCode: 500,
          },
        },
      };
    }
  };