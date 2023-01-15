import { FC } from 'react'
import './style.scss'
import RequireAuth from '../../../hok/RequireAuth'
import Modal from '../../../ui-components/modal'
import TextAria from '../../../ui-components/TextAria'
import Button from '../../../ui-components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch } from '../../../hooks/redux'
import { useAppSelector } from '../../../hooks/redux'
import { createReviewThunk } from '../../../store/thunk/ProductDetailsThunk'

interface IWriteFeedBackModalProps {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    id: number
}

type FormValues = {
    review: string
};

const WriteFeedBackModal: FC<IWriteFeedBackModalProps> = ({ visible, setVisible, id }) => {

    const email = useAppSelector(state => state.auth.user?.email)
    const dispatch = useAppDispatch()

    const schema = yup.object().shape({
        review: yup.string().required('This fild is a required'),
    })

    const { register, handleSubmit, reset, formState: {
        errors,
        isValid,
    } } = useForm<FormValues>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {

        let month = (new Date().getMonth() + 1).toString()
        month = month.length < 2 ? `0${month}` : month
        const year = new Date().getFullYear().toString()
        const day = new Date().getDate().toString()
        const date = [day, month, year]

        const review = {
            review: {
                email: email!,
                review: data.review,
                data: date.join('.')
            },
            id: id,

        }
        dispatch(createReviewThunk(review))
        setVisible(false)
        reset()
        
    }

    return (
        <>
            <Modal isVisible={visible} setIsVisible={setVisible}>
                {visible &&
                    <RequireAuth>
                            <div className='write-feedback-modal'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='write-feedback-modal__text-area'>
                                        <TextAria register={register('review')} errors={errors.review} type='text' id='review' />
                                    </div>
                                    <div className='write-feedback-modal__btn'>
                                        <Button isValid={isValid}>Give feedback</Button>
                                    </div>
                                </form>
                            </div>
                    </RequireAuth>
                }
            </Modal>
        </>
    )
}

export default WriteFeedBackModal