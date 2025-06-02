import React, { useState } from 'react';

function ProductInput({ image, name, price, onDataChange, onCreate }) {
  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    //1. 이미지 파일 (object URL) 유효성 검사
    //   파일을 선택하면 URL.createObjectURL() 형태(blob:...) 문자열이 저장됩니다.
    if (!image.trim()) {
      newErrors.image = '이미지 파일을 선택하세요.';
    }

    //2. 상품명 유효성 검사
    if (!name.trim()) {
      newErrors.name = '상품명을 입력하세요.';
    }

    //3. 가격정보 유효성 검사
    if (!price.trim()) {
      newErrors.price = '가격정보를 입력하세요.';
    } else if (!/^\d+$/.test(price)) {
      newErrors.price = '가격정보는 숫자만 입력 가능합니다.';
    }

    setErrors(newErrors);

    // 위 항목 모두 이상없이 입력을 하였다면 true 리턴
    return Object.keys(newErrors).length === 0;
  }; // validate 함수 끝

  // 내용입력 버튼 클릭시 실행되는 함수
  const handleClick = () => {
    if (validate()) {
      onCreate();
    }
  };

  //가격정보를 입력시 실행되는 함수
  const handlePriceChange = (e) => {
    const onlyNumbers = e.target.value.replace(/[^\d]/g, ''); //숫자만 추출)
    onDataChange({ target: { name: 'price', value: onlyNumbers } }); //부모에게 숫자만 전달함
  };

  //숫자에 천단위 구분기호(,)가 자동으로 삽입되게 하기 위한 함수
  const formatPrice = (numStr) => {
    if (!numStr) return '';
    return parseInt(numStr, 10).toLocaleString(); //숫자에 쉼표 기호가 들어가게 해줌.
  };

  // ★★★  추가된 함수 : 파일 선택 시 object URL 생성 ★★★
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 브라우저 메모리에 임시 URL 생성
      const url = URL.createObjectURL(file);
      // 부모(state) 갱신 → image 항목에 object URL 저장
      onDataChange({ target: { name: 'image', value: url } });
    }
  };

  const errorStyle = {
    color: '#ff0000',
    fontSize: '12px',
  };

  return (
    <>
      <div className="create">
        {/* ---------- 이미지 파일 선택 ---------- */}
        <p>
          <label htmlFor="img_file">이미지 파일 업로드 : </label>
          <input
            type="file"
            id="img_file"
            accept="image/*"            // 이미지 전용
            onChange={handleFileChange}  // 파일 선택 시 object URL 생성
          />
          {errors.image && <div style={errorStyle}>{errors.image}</div>}
        </p>

        <p>
          <label htmlFor="product_name">상품명 : </label>
          <input
            type="text"
            id="product_name"
            name="name"
            placeholder="상품명을 입력하세요. 예)[LIMITED]아보 커들 145g - 버블 바"
            onChange={onDataChange}
            value={name}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </p>

        <p>
          <label htmlFor="price_info">가격정보 : </label>
          <input
            type="text"
            id="price_info"
            name="price"
            placeholder="가격정보를 입력하세요. 예) 999,000"
            onChange={handlePriceChange}
            value={formatPrice(price)}
          />
          {errors.price && <div style={errorStyle}>{errors.price}</div>}
        </p>

        <p>
          <input
            type="button"
            value="내용입력"
            onClick={handleClick}
            className="submit_btn"
          />
        </p>
      </div>
    </>
  );
}

export default ProductInput;
