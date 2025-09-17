import logoImage from '../../images/cof_logo_three.png';

export default function ApplicationLogo(props)
{
    const { className, ...rest } = props;
    return (
        <img
            {...rest}
            //src="/images/cof_logo_three.png"
            src={logoImage}
            alt="Community of Faith Logo"
            className={className}
        />
    );
}
