import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { formatPrice } from 'utils';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import NavUser from 'components/web/NavUserPage/NavUser';
import Pagination from 'components/web/pagination/index';
import OrderListInfo from 'components/admin/order/OrderListInfo';
import './style.css';

const PageSize = 5;

const Index = function (props) {
  const { dataOrderList, label, orderComplete, orderCancel } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataOrderList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataOrderList]);

  return (
    <>
      <Helmet>
        <title>{label}</title>
      </Helmet>
      <main id="main" className="web-user-page web-page web-page--with-header page-content clearfix">
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="web-container">
          <NavUser />
        </div>
        <div className="primary-content">
          <div className="web-order-history orders-history">
            <div className="page-header">
              <h1>
                <span className="subtitle">Đơn hàng của tôi</span> <span className="title">Đơn {label}</span>
              </h1>
            </div>
            {dataOrderList.length === 0 && <div className="web-container no-orders">Hiện tại chưa có đơn {label}</div>}
            {dataOrderList.length > 0 && (
              <div className="web-container web-user-page__table">
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Địa chỉ email</TableCell>
                        <TableCell>Tổng giá</TableCell>
                        {orderCancel ? '' : <TableCell>Phí vận chuyển</TableCell>}
                        <TableCell>Ngày tạo đơn</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentTableData.map((order) => (
                        <>
                          {orderComplete ? (
                            <TableRow hover key={order.orderId._id}>
                              <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}
                                >
                                  <Typography color="textPrimary" variant="body1">
                                    {order.orderId._id}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell>{order.orderId.userId.email}</TableCell>
                              <TableCell>{formatPrice(order.orderId.totalPrice)}</TableCell>
                              <TableCell>{formatPrice(order.shiprice)}</TableCell>
                              <TableCell>{moment(order.orderId.createdAt).format('DD/MM/YYYY')}</TableCell>
                              <TableCell>{order.status}</TableCell>
                              <TableCell>
                                <OrderListInfo order={order.orderId} />
                              </TableCell>
                            </TableRow>
                          ) : (
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
                              </TableCell>
                            </TableRow>
                          )}
                        </>
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

export default Index;
