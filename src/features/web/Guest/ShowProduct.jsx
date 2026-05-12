/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Filter from 'components/web/filter';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import Pagination from 'components/web/pagination/index';
import ProductsList from 'components/web/product/ProductsList';
import { categoryCDetail } from 'slice/CategoryChildSlice';
import { getListProduct } from 'slice/ProductListSlice';
import './style.css';

const PageSize = 8;

const ShowProduct = function () {
  const {
    params: { catechildId },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const dataProductsList = useSelector((state) => state.productList.data);
  const dataCategoryCDetail = useSelector((state) => state.categoryChildList.categoryChildDetail);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const dataProduct = dataProductsList.filter((service) => service.status === true);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (data !== '' ? data : dataProduct).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, dataProduct]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getListProduct({
          page: 1,
          limit: 10000,
          subcategoryId: catechildId,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const actionChild = categoryCDetail(catechildId, { substatus: true });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [catechildId, dispatch]);

  useEffect(() => {
    setData(dataProduct);
  }, [dataProductsList]);

  return (
    <div className="web-guest-page web-page web-page--with-header web-product-list-page">
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" className="web-guest-page__content clearfix">
        <div className="content-slot slot-grid-header" />
        <div className="primary-content">
          <div className="page-header">
            <h1>
              <span className="title">{dataCategoryCDetail.namesubCategory}</span>
            </h1>
          </div>

          <div className="web-container">
            <div className="category-box web-guest-page__shell">
              <div className="web-product-list-page__toolbar">
                <h1 className="web-product-list-page__summary">{currentTableData.length} sản phẩm</h1>
                <div className="filters-tabs">
                  <Modal classNameModal={'btn btn-link filters-tab'} label={'Lọc'}>
                    <Filter data={data} setData={setData} productList={dataProduct} />
                  </Modal>
                </div>
              </div>

              <ul className="web-product-grid search-result-items tiles-container js-slv-product-grid row" data-columns>
                <ProductsList data={currentTableData} />
              </ul>
              <Pagination className="cursor" currentPage={currentPage} totalCount={data.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowProduct;
