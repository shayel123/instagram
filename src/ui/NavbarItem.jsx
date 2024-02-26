export default function NavbarItem({src,txt,onClick}){
    return (
        <li onClick={onClick}>
        <img src={src} alt="" />
        <span>{txt}</span>
    </li>
    )
}