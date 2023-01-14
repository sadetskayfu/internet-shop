import React from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg'
import { Link } from 'react-scroll'
import { useAppDispatch } from '../../hooks/redux';
import { useAppSelector } from '../../hooks/redux';
import { catalogSlice } from '../../store/reducer/CatalogSlice';
import './style.scss'

interface IPaginationProps {
    titleLink: string
    setPagination: React.Dispatch<React.SetStateAction<boolean>>
    pagination: boolean
}

const Pagination: React.FC<IPaginationProps> = ({ titleLink, setPagination, pagination }) => {

    const dispatch = useAppDispatch()
    const { setCurrentPage } = catalogSlice.actions
    const { currentPage, totalPerPage, totalCount } = useAppSelector(state => state.catalog.pagination)

    const pages = Math.ceil(totalCount / totalPerPage)

    const getArrayPages = (pages: number) => {
        let array: number[] = []
        for (let i = 0; i < pages; i++) {
            array.push(i + 1)
        }
        return array
    }

    const arrayPages = getArrayPages(pages)

    const arrowLeftRun = () => {
        if (currentPage == 1) {
            return
        } else {
            setPagination(!pagination)
            dispatch(setCurrentPage(currentPage - 1))
        }
    }
    const arrowRightRun = () => {
        if (currentPage == pages) {
            return
        } else {
            setPagination(!pagination)
            dispatch(setCurrentPage(currentPage + 1))
        }
    }

    const buttonRun = (item: number) => {
        if (currentPage == item) {
            return
        }
        setPagination(!pagination)
        dispatch(setCurrentPage(item))
    }

    return (
        <div className='pagination'>
            <Link
                to={currentPage == 1 ? '' : titleLink}
                smooth={true}
                duration={500}>
                <Arrow onClick={arrowLeftRun} className='pagination__arrow ' />
            </Link>
            {arrayPages.map((item) => <Link
                key={item}
                to={currentPage == item ? '' : titleLink}
                smooth={true}
                duration={500}
            ><div
                onClick={() => (buttonRun(item))}
                className={currentPage == item ? 'pagination__items active' : 'pagination__items'}>
                    {item}
                </div></Link>)}
            <Link
                to={currentPage == pages ? '' : titleLink}
                smooth={true}
                duration={500}
            ><Arrow onClick={arrowRightRun} className='pagination__arrow right' />
            </Link>
        </div>
    );
};

export default Pagination;