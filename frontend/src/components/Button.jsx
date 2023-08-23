const Button = (props) => (
    <div className="flex flex-start mt-5">
        <h1 className={props.className}>{props.message}</h1>
    </div>
);

export default Button;
