import React from 'react';
import { usePagination, DOTS } from 'components/web/pagination/usePagination';

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="web-pagination-wrap centered">
      <ul className={`web-pagination pagination ${className || ''}`.trim()}>
        <li className={`web-pagination__item page-item ${currentPage === 1 ? 'disable' : ''}`} onClick={onPrevious}>
          <span>Truoc</span>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`dots-${currentPage}`} className="web-pagination__item page-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={`web-pagination__item page-item ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li className={`web-pagination__item page-item ${currentPage === lastPage ? 'disable' : ''}`} onClick={onNext}>
          <span>Sau</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
