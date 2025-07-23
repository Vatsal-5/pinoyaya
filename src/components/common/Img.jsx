import { onImageError } from '@/lib/utils'

const Img = (props) => {
  return (
    <img {...props} onError={onImageError}/>
  )
}

export default Img