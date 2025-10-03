import logoImage from '../../images/cof-logo_new.png';

export default function ApplicationLogo(props)
{
    const { className, ...rest } = props;
    return (
        <img
            {...rest}
            src={logoImage}
            alt="Community of Faith Logo"
            className={className}
        />
    );
}
