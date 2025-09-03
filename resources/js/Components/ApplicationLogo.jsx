export default function ApplicationLogo(props)
{
    const { className, ...rest } = props;
    return (
        <img
            {...rest}
            src="/storage/image/cof_logo_three.png"
            alt="Community of Faith Logo"
            className={className}
        />
    );
}
