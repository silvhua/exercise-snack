import './Video.scss';

const Video = ({src, title, className}) => {
  src = src || 'https://youtu.be/9DkWqGqiT60'
  let youtubeSrc = null;
  if (src.includes('youtube') || src.includes('youtu.be')) {
    youtubeSrc = src.split('/').pop();
  } 
  
  if (youtubeSrc) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${youtubeSrc}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      >
      </iframe>
    )
  } else {
    return (
      <video className={className}>
        <source
          src={src}
          controls
          poster=''
          loop
        />
      </video>
    )
  }
}

export default Video
