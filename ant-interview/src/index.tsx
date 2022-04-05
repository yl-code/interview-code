/**
 * 按钮自动倒计时
 *    进入页面时，卡片中的按钮开始自动 10s 倒计时
 *    倒计时过程中，按钮显示剩余时间（文案为：10s、9s、8s、...、1s）
 *    倒计时结束后，按钮文案变为「抢购」
 * 抢购功能模拟
 *    点击抢购按钮时，调用异步模拟请求方法，请求完成后按钮文字变为「已抢购」
 *    异步请求模拟方法需自行实现，延迟 1s 后返回成功即可
 */

import React, {
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

/**
 * 营销卡片渲染数据
 */
interface IDirectVoucher {
  id: ReactText;
  /** 品牌名 */
  brandName?: string;
  /** 品牌logo */
  brandLogo?: string;
  /** 距离描述 */
  distanceDesc?: string;
  /** 活动素材图 */
  campImage?: string;
  /** 营销标签 */
  promoLogo?: string | string[];
  /** 券描述 */
  voucherDesc?: string;
  /** 券 */
  benefitAmount?: string;
  /** 特价券原价 */
  oriPriceAmount?: string;
  /** 折扣描述 */
  discountDesc?: string;
  /** 库存 */
  voucherStockNum?: string;
}

const cardDataList: IDirectVoucher[] = [
  {
    id: 1,
    brandName: '弄堂里',
    brandLogo:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
    distanceDesc: '500m',
    campImage:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
    promoLogo: [
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*y6CTRo9L2oEAAAAAAAAAAAAAARQnAQ',
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
    ],
    voucherDesc: '弄堂里14元超值优惠券包x2',
    benefitAmount: '1',
    oriPriceAmount: '28',
    discountDesc: '0.6折',
    voucherStockNum: '库存888份',
  },
  {
    id: 2,
    brandName: '弄堂里',
    brandLogo:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
    distanceDesc: '500m',
    campImage:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
    promoLogo: [
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
    ],
    voucherDesc: '弄堂里14元超值优惠券包x2',
    benefitAmount: '1',
    discountDesc: '0.6折',
  },
  {
    id: 3,
    brandName: '飞猪',
    brandLogo:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*dCL5Q4oBaQsAAAAAAAAAAAAAARQnAQ',
    campImage:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*MZ7VSaNZXRYAAAAAAAAAAAAAARQnAQ',
    promoLogo:
      'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*90WEQLmnKdkAAAAAAAAAAAAAARQnAQ',
    voucherDesc: '南方航空20元优惠券',
    benefitAmount: '20',
  },
];

interface ICardProps {
  data: IDirectVoucher;
}

const request = (id: ReactText) => {
  console.log('buy', id);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        errorMsg: '', // 错误信息
        success: true, // 操作是否成功
        id, // 商品 ID
      });
    }, 1000);
  });
};

const Card: React.FC<ICardProps> = (props) => {
  const { data } = props;

  if (!Array.isArray(data.promoLogo)) {
    data.promoLogo = [data.promoLogo as string];
  }

  const [countdown, setCountdown] = useState(10);
  const [bought, setBought] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const purchase = useCallback(() => {
    if (countdown || loading || bought) {
      return false;
    }

    setLoading(true);

    request(data.id)
      .then(() => {
        setBought(true);
      })
      .catch((err) => {
        alert(err.errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data.id, countdown, loading, bought]);

  const btnText = useMemo(() => {
    if (countdown) {
      return `${countdown}s`;
    } else if (bought) {
      return '已抢购';
    } else {
      return '抢购';
    }
  }, [countdown, bought]);

  const loadingClass: string = useMemo(
    () => (loading || countdown ? 'loading' : ''),
    [loading, countdown]
  );

  return (
    <div className='card'>
      <div className='card-left'>
        <div className='card-left-title'>
          <div className='title'>
            <img src={data.brandLogo} alt='' />
            <span>{data.brandName}</span>
          </div>
          <div className='distanceDesc'>{data.distanceDesc}</div>
        </div>
        <div className='card-left-content'>
          <img src={data.campImage} alt='' className='card-left-campImg' />
          <div className='card-left-desc'>
            <div className='card-left-promoLogo'>
              {data.promoLogo.map((imgSrc) => (
                <img key={imgSrc} src={imgSrc} alt='' />
              ))}
            </div>

            <div className='card-left-voucherDesc'>{data.voucherDesc}</div>
            <div className='card-left-benefitAmount'>
              {data.benefitAmount}元
            </div>

            <div className='card-left-discountDesc'>{data.discountDesc}</div>
          </div>
        </div>
      </div>

      <div className='card-right'>
        {!!data.discountDesc && (
          <div className='card-right-discountDesc'>
            <span className='side left'></span>
            <span>{data.discountDesc}</span>
            <span className='side right'></span>
          </div>
        )}
        <div className={`card-right-btn ${loadingClass}`} onClick={purchase}>
          {btnText}
        </div>
        <div className='card-right-voucherStockNum'>{data.voucherStockNum}</div>
      </div>
    </div>
  );
};

const CardList: React.FC<{ list: IDirectVoucher[] }> = (props) => {
  return (
    <div className='card-list'>
      {props.list.map((data) => (
        <Card data={data} key={data.id} />
      ))}
    </div>
  );
};

ReactDOM.render(
  <CardList list={cardDataList} />,
  document.getElementById('app')
);
