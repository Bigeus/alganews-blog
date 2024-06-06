import Image from "next/image"
import styled from "styled-components"
import defaultAvatar from "../public/Profile_avatar_placeholder_large.png";
import { useState } from "react";

interface AvatarProps {
    src: string
}

export default function Avatar(props: AvatarProps) {
    const [src, setSrc] = useState(props.src);

    return <Wrapper>
        <StyledAvatar
            alt=""
            width={40}
            height={40}
            src={src}
            onError={(e) => {
                setSrc(defaultAvatar.src)
            }}
        />
    </Wrapper>
}

const StyledAvatar = styled(Image)`
    object-fit: cover;
`

const Wrapper = styled.div`
    border-radius: 20px;
    box-shadow: 0 0 0 4px ${p => p.theme.primaryForeground};
    overflow: hidden;
    height: 40px;
    width: 40px;
`