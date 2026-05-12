/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination/index';
import ProductsList from 'components/web/product/ProductsList';
import { getSearchByWord } from 'slice/SearchSlice';
import './style.css';

const PageSize = 8;

const Search = function () {
  const location = useLocation();
  const searchFor = location.search.substring(3);
  const dispatch = useDispatch();
  const dataProductsList = useSelector((state) => state.search.dataSearch);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getSearchByWord({ stringSearch: searchFor });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, searchFor]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataProductsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataProductsList]);

  return (
    <div className="web-guest-page web-page web-page--with-header web-search-page">
      <Helmet>
        <title>Tìm Kiếm</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" className="web-guest-page__content clearfix">
        <div className="content-slot slot-grid-header" />
        <div className="primary-content">
          <div className="web-container">
            <div className="category-box web-search-page__shell">
              <div className="web-search-page__toolbar">
                <h1 className="web-search-page__summary">{currentTableData.length} sản phẩm cho {searchFor}</h1>
              </div>
              <ul className="web-product-grid search-result-items tiles-container js-slv-product-grid row" data-columns>
                <ProductsList data={currentTableData} />
              </ul>
              <Pagination className="cursor" currentPage={currentPage} totalCount={dataProductsList.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
