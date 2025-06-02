import React, { useState, useRef } from 'react';
import dummy from '../db/product.json';
import ProductInput from './ProductInput';
import Product from './Product';

function ProductList() {
  //데이터를 초기값으로 사용
  const [products, setProducts] = useState(dummy); //json데이터 로딩

  const nextId = useRef(products.length + 1); //id값은 불러온 데이터개수에 1을 더해서 추가해야

  //입력상자에서 사용할 state관리
  const [inputs, setInputs] = useState({
    image: '',
    name: '',
    price: '',
  });

  //삭제하기 버튼 클릭기 해당 id를 찾아서 삭제한다.
  const onRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  //비구조화 할당 방식으로 각각 state값 변수에 담기
  const { image, name, price } = inputs;

  //데이터 변경함수
  const onDataChange = (e) => {
    //name과 value는 값이 변경되는 input태그의 속성을 비구조화 할당 한다.
    const { name, value } = e.target;

    //state값 변경하기
    setInputs({
      ...inputs, //변경되는 것 외에 나머지 속성값을 의미하는 패턴식임.
      [name]: value,
    });
  };

  //데이터 입력을 하기 위한 함수
  const onCreate = () => {
    //새롭게 배열 데이터를 추가하는 함수
    const product = {
      id: 'a' + nextId.current, //배열값 앞에 'a'문자를 붙여서 복사방지함.
      image,
      name,
      price,
    };

    //기본 배열(목록)의 뒤에 새로 입력한 데이터가 추가되도록 한다.
    setProducts([...products, product]);

    //데이터 입력 후 입력박스에는 아무것도 없이 내용을 비운다.
    setInputs({
      image: '',
      name: '',
      price: '',
    });

    nextId.current += 1; //기존 배열값 순서에 1을 더하여 계속 추가하도록 한다.
  };

  return (
    <>
      {/* 상품입력 콤포넌트 */}
      <ProductInput
        image={image}
        name={name}
        price={price}
        onDataChange={onDataChange}
        onCreate={onCreate}
      />

      {/* 상품리스트 출력 */}
      <ul className="product_list">
        {products.map((product) => (
          <Product product={product} key={product.id} onRemove={onRemove} />
        ))}
      </ul>
    </>
  );
}

export default ProductList;
