import React from 'react';

function Product({ product, onRemove }) {
  //가격 포멧 함수
  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    const num = parseInt(priceStr.toString().replace(/,/g, ''), 10);
    if (isNaN(num)) return priceStr;
    return num.toLocaleString();
  };

  // ★★★  추가된 로직 : 업로드한 이미지(blob:, data:) vs 기존 이미지 파일명 구분 ★★★
  const isFullPath =
    product.image.startsWith('blob:') || // FileReader / createObjectURL
    product.image.startsWith('data:') || // Base64
    product.image.startsWith('http');    // 외부 URL

  const imgSrc = isFullPath
    ? product.image                               // 그대로 사용
    : `${process.env.PUBLIC_URL}/images/${product.image}`; // 기존 방식

  return (
    <>
      <li>
        <img src={imgSrc} alt={product.name} />
        <p>상품명 : {product.name}</p>
        <p className="price">가격 : {formatPrice(product.price)}원</p>
        <p>
          <input
            type="button"
            className="btn"
            value="삭제하기"
            onClick={() => onRemove(product.id)}
          />
        </p>
      </li>
    </>
  );
}

export default Product;
