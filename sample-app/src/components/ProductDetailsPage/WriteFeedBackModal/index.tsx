import { FC } from 'react'
import './style.scss'
import RequireAuth from '../../../hok/RequireAuth'
import Modal from '../../../ui-components/modal'

interface IWriteFeedBackModalProps {
    visible: boolean
    setVisible: any
}

const WriteFeedBackModal: FC<IWriteFeedBackModalProps> = ({ visible, setVisible }) => {
    return (
        <Modal isVisible={visible} setIsVisible={setVisible}>
            {visible &&
                <RequireAuth>
                    <div className='write-feedback-modal'>

                    </div>
                </RequireAuth>
            }
        </Modal>
    )
}

export default WriteFeedBackModal