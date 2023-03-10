import { FC, useEffect, useState } from 'react';
import './style.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { cartSlice } from '../../../store/reducer/CartSlice';
import Button from '../../../ui-components/Button';
import ImageSlider from '../../../ui-components/imageSlider';
import Modal from '../../../ui-components/modal';
import ColorSelect from '../../../ui-components/SelectColor';
import Select from '../../../ui-components/Select';
import { ReactComponent as Zoom } from '../../../assets/icons/zoom.svg'
import FlyToCart from '../../../ui-components/FlyToCart';
import DropDown from '../../../ui-components/DropDown';
import { IProduct } from '../../../models/product';
import Error from '../../Error';
import WriteFeedBackModal from '../WriteFeedBackModal';

interface IProductDetailsProps {
    product: IProduct | null
    id: number
}

const ProductDetails: FC<IProductDetailsProps> = ({ product, id }) => {

    const [selectedImage, setSelectedImage] = useState<number>(0)
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [isVisibleFeedBackModal, setIsVisibleFeedBackModal] = useState<boolean>(false)
    const [visibleAddToCartSpan, setVisibleAddToCartSpan] = useState<boolean>(false)
    const [colorValue, setColorValue] = useState<string>('')
    const [sizeValue, setSizeValue] = useState<string>('')

    const { productError } = useAppSelector(state => state.productDetails)

    const { addProduct } = cartSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        product && setColorValue(product.color[0])
        product && setSizeValue(product.size[0])
    }, [product])

    const selectImage = (i: string) => {
        product && setSelectedImage(product.images.indexOf(i))
    }

    const addProductInCart = () => {
        const productInCart = {
            ...product!,
            color: colorValue,
            size: sizeValue,
            counter: 1,
        }
        setVisibleAddToCartSpan(true)
        dispatch(addProduct(productInCart))
        setTimeout(() => {
            setVisibleAddToCartSpan(false)
        }, 800)
    }

    return (
        <section className='product-details'>
            {productError.length > 0 ?
                <Error error={productError} />
                :
                <>
                        <WriteFeedBackModal visible={isVisibleFeedBackModal} setVisible={setIsVisibleFeedBackModal} id={id}/>
                    <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} padding='0px'>
                        <div className='prduct-details__slider'>
                            <ImageSlider images={product?.images} initialSlide={selectedImage} />
                        </div>
                    </Modal>
                    <div className='product-details__product-details'>
                        <div className='product-details__gallery'>
                            <div className='product-details__other-images'>
                                {product?.images.map((i, index) =>
                                    i !== product.images[selectedImage] &&
                                    <div key={index} onClick={() => selectImage(i)} className='product-details__other-img sh'>
                                        <img src={i} />
                                    </div>
                                )}
                            </div>
                            <div onClick={() => setIsVisibleModal(true)} className='product-details__main-image sh'>
                                <FlyToCart width='370px' height='540px' visible={visibleAddToCartSpan}>
                                    <img src={product?.images[selectedImage]} />
                                </FlyToCart>
                                <img src={product?.images[selectedImage]} />
                                <Zoom className='product-details__zoom' />
                            </div>
                        </div>
                        <div className='product-details__desc'>
                            <div className='product-details__title title_fz20'>
                                {product?.title}
                                <div className='product-details__all-color'>
                                    {product?.color.map((i) => <div key={i} className='product-details__color' style={{ backgroundColor: `${i}` }}></div>)}
                                </div>
                            </div>
                            <div className='product-details__price title title_fz16'>{product?.price}$</div>
                            <div className='product-details__color-select'>
                                <ColorSelect value={colorValue} onChange={setColorValue} options={product?.color} />
                            </div>
                            <div className='product-details__color-text title_fz14'>
                                Color: {colorValue}
                            </div>
                            <div className='product-details__size title_fz14'>
                                Select size
                            </div>
                            <div className='product-details__size-select'>
                                <Select value={sizeValue} onChange={setSizeValue} options={product?.size} />
                            </div>
                            <div className='product-details__btn-cart'>
                                <Button onClick={() => addProductInCart()} isValid={true}>Add to cart</Button>
                            </div>
                            <div className='product-details__drop-down'>
                                <DropDown title='Measurements and description'>
                                    <div className='product-details__drop-down-content'>
                                        <div className='title_fz14'>
                                            <p>????????????: 50% ????????????, 50% ????????????????</p>
                                            <p>??????????????????: 100% ??????????????????</p>
                                            <p>????????????????????: 90% ??????, 10% ????????</p>
                                        </div>
                                        <div className='title_fz14'>
                                            <p>- ???? ??????????????</p>
                                            <p>- ?????????????? ?????? ?????????????????????? ?????????? ???? 110'??</p>
                                            <p>- ???? ????????????????????</p>
                                            <p>- ?????????? ????????????</p>
                                            <p>- ???????????????????? ?????????? ??????????????????</p>
                                        </div>
                                    </div>
                                </DropDown>
                                <DropDown title='??omposition and care'>
                                    <div className='product-details__drop-down-content'>
                                        <div className='title_fz14'>
                                            <p>????????????: 50% ????????????, 50% ????????????????</p>
                                            <p>??????????????????: 100% ??????????????????</p>
                                            <p>????????????????????: 90% ??????, 10% ????????</p>
                                        </div>
                                        <div className='title_fz14'>
                                            <p>- ???? ??????????????</p>
                                            <p>- ?????????????? ?????? ?????????????????????? ?????????? ???? 110'??</p>
                                            <p>- ???? ????????????????????</p>
                                            <p>- ?????????? ????????????</p>
                                            <p>- ???????????????????? ?????????? ??????????????????</p>
                                        </div>
                                    </div>
                                </DropDown>
                            </div>
                                <div className='product-details__btn-feedback'>
                                    <Button onClick={() => setIsVisibleFeedBackModal(true)} isValid={true}>Write a feedback</Button>
                                </div>
                        </div>
                    </div>
                </>
            }
        </section>
    );
};

export default ProductDetails;