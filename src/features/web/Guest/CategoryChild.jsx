import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { useSnackbar } from 'notistack';
import CateC from 'components/web/category/CateC';
import Loader from 'components/fullPageLoading';
import { getListCategoryChild } from 'slice/CategoryChildSlice';
import { categoryDetail } from 'slice/CategorySlice';
import './style.css';

function CategoryChild() {
  const {
    params: { id },
  } = useRouteMatch();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const dataCategoryDetail = useSelector((state) => state.categoryList.categoryDetail);
  const dataCategoryCList = useSelector((state) => state.categoryChildList.data);
  const [data, setData] = useState(dataCategoryCList.subcategories);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = categoryDetail(id);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar, id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getListCategoryChild(id);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataCategoryCList.length, dataCategoryDetail.length, dispatch, enqueueSnackbar, id]);

  useEffect(() => {
    setData(dataCategoryCList.subcategories ? dataCategoryCList.subcategories.filter((service) => service.substatus === true) : dataCategoryCList.subcategories);
  }, [dataCategoryCList.subcategories]);

  return (
    <div className="web-guest-page web-page web-page--with-header web-category-page">
      <Loader showLoader={loading} />
      <main id="main" className="web-guest-page__content clearfix">
        <div className="content-slot slot-grid-header" />
        <div className="primary-content">
          <div className="page-header">
            <h1>
              <span className="title">{dataCategoryDetail.nameCategory}</span>
            </h1>
          </div>
          <div className="web-container web-category-page__grid">
            <CateC data={data || []} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryChild;
