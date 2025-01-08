const ActionButton = ({ onClick, text}) => {
    return(
        <button onClick={onClick} className={`button-${text}-function`}>{text}</button>
    )
}
export default ActionButton;