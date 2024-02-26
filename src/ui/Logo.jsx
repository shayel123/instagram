import logoSvg from '../assets/imgs/logo.svg';


export default function Logo(){
    return (
        <div className='logo-container'>
        <img className='logo-img' src={logoSvg} alt="" />
    </div>
    )
}