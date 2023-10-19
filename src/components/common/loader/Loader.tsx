import "./Loader.css"


interface LoaderProps { }
const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="loader">
      <ul>
        <li>A</li>
        <li>S</li>
        <li>H</li>
        <li>E</li>
        <li>F</li>
        <li>A</li>
        <li>M</li>
        <li>U</li>
      </ul>
    </div>
  )
}

export default Loader