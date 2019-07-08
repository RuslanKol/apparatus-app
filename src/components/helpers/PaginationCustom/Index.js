import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function PaginationCustom(props) {
  const { totalPages, page, handleClickPagination } = props;
  let range = [];
  for (let i = 1; totalPages + 1 > i; i++) {
    range.push(i);
  }
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem onClick={() => handleClickPagination(page, 'prev', totalPages)}>
        <PaginationLink previous className="icon-arrow-left" />
      </PaginationItem>
      {range.map(i => (
        <PaginationItem
          key={`${i} + pagination`}
          className={i == page ? 'active' : null}
          onClick={() => handleClickPagination(page, i, totalPages)}
        >
          <PaginationLink>{i}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem onClick={() => handleClickPagination(page, 'next', totalPages)}>
        <PaginationLink next className="icon-arrow-right " />
      </PaginationItem>
    </Pagination>
  );
}
