import React, { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PaymentIcon from '@material-ui/icons/Payment';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Loader from 'components/fullPageLoading';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import NavUser from 'components/web/NavUserPage/NavUser';
import Pagination from 'components/web/pagination/index';
import { deleteOrderAdmin, finalizeMockVnpay, getOrder, paymentVNPAY } from 'slice/OrderSlice';
import { formatPrice } from 'utils';
import { isMockMode } from 'mocks';
import './style.css';

const PageSize = 5;

const Order = function () {
  const { enqueueSnackbar } = useSnackbar();
  const dataOrderList = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const searchParams = new URLSearchParams(location.search);
        const shouldFinalizeMockVnpay = isMockMode && searchParams.get('mockVnpay') === 'success' && searchParams.get('orderId');

        if (shouldFinalizeMockVnpay) {
          const finalizeAction = finalizeMockVnpay(searchParams.get('orderId'));
          const finalizeResultAction = await dispatch(finalizeAction);
          unwrapResult(finalizeResultAction);
          history.replace('/order');
          enqueueSnackbar('Thanh toan VNPAY mock thanh cong', { variant: 'success' });
        }

        const action = getOrder({
          status: 'Pending',
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar, history, location.search]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataOrderList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataOrderList]);

  const handleOnCancel = async (id) => {
    try {
      setLoading(true);
      const action = deleteOrderAdmin(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Huy thanh cong', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOnVNPAY = async (id) => {
    try {
      setLoading(true);
      const action = paymentVNPAY(id);
      const resultAction = await dispatch(action);
      const linkHref = unwrapResult(resultAction);
      window.location.href = linkHref.vnpUrl;
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Dang xu ly</title>
      </Helmet>
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="web-container">
          <NavUser />
        </div>
        <div className="primary-content">
          <div className="orders-history">
            <div className="page-header">
              <h1>
                <span className="subtitle">Don hang cua toi</span> <span className="title">Don dang xu ly</span>
              </h1>
            </div>
            {dataOrderList.length === 0 && <div className="web-container no-orders">Hien tai chua co don dang xu ly</div>}
            {dataOrderList.length > 0 && (
              <div className="web-container web-user-page__table">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Dia chi email</TableCell>
                        <TableCell>Tong gia</TableCell>
                        <TableCell>Ngay tao don</TableCell>
                        <TableCell>Trang thai</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentTableData.map((order) => (
                        <TableRow hover key={order._id}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {order._id}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>{order.userId.email}</TableCell>
                          <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                          <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>
                            <OrderListInfo order={order} />
                            <IconButton className="mgr-10" color="secondary" aria-label="delete" onClick={() => handleOnCancel(order._id)}>
                              <ClearIcon />
                            </IconButton>
                            {order.paymentMethod === 'None' && (
                              <IconButton className="mgr-10" color="primary" aria-label="pay" onClick={() => handleOnVNPAY(order._id)}>
                                <PaymentIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination className="cursor mg-t-20" currentPage={currentPage} totalCount={dataOrderList.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
              </div>
            )}
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
};

export default Order;
