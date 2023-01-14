import { useNavigate } from "react-router-dom";
import './style.scss'

interface ILinkToBack {
    children: React.ReactNode
}

const LinkToBack: React.FC<ILinkToBack> = ({ children, ...props }) => {
   
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='link-back-container'>
            <a onClick={goBack} {...props} className='link-back-container__link'>
                {children}
            </a>
            <div className='link-back-container__line'></div>
        </div >
    );
};

export default LinkToBack;