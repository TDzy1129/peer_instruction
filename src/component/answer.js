import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './answer.css'
import { selectRecord } from '../api/answer';
import { selectQ} from '../api/question';

// 注册 Chart.js 所需的组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Answer = () => {
    const {id} = useParams()
  // 初始化题目、选项和回答分布的state
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answerDistribution, setAnswerDistribution] = useState([]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 返回到上一个页面
  };
  // 使用 useEffect 模拟数据初始化
  useEffect(() => {
    const fetchData = async () => {
        try {
            const h_w_record = await selectRecord(id);
            const data = h_w_record;
            const h_w = await selectQ(id)
            const calculateAnswerDistribution = (data) => {
                const counts = { A: 0, B: 0, C: 0, D: 0 };

                // 遍历数据，统计每个选项的数量
                data.forEach(item => {
                  if (counts[item.answer] !== undefined) {
                    counts[item.answer]++;
                  }
                });
              
                // 返回选项的数量数组
                return ['A', 'B', 'C', 'D'].map(option => counts[option]);
            };
            const initialAnswerDistribution = calculateAnswerDistribution(data[0]);
            // 更新状态
            setQuestion(h_w[0][0].content)
            setOptions([h_w[0][0].option_a, h_w[0][0].option_b, h_w[0][0].option_c, h_w[0][0].option_d]);
            setAnswerDistribution(initialAnswerDistribution);
        } catch (error) {
            console.error('数据加载失败', error);
        }
    };

    fetchData();
}, [id]);


  // 创建条形图所需的数据格式
  const chartData = {
    labels: options, // 选项
    datasets: [
      {
        label:"数量",
        data: answerDistribution, // 答案分布
        backgroundColor: '#36A2EB', // 条形图的颜色
        borderColor: '#36A2EB',
        borderWidth: 1,
        barThickness: 20, // 控制条形图的粗细
      },
    ],
  };

  // 配置图表选项（如缩小图表大小）
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 允许图表容器尺寸发生变化
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true, // 确保从0开始显示
        ticks: {
          // 显示 A, B, C, D
          callback: function(value) {
            return ['A', 'B', 'C', 'D'][value]; // 将 x 轴的数字值映射到 A, B, C, D
          }
        },
      },
      y: {
        beginAtZero: true, // 确保从0开始显示
      },
    },
  };

  return (
    <div className="answer-container">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option">
            <input type="radio" name="answer" id={`option${index}`} className="hidden-radio" disabled />
            <label htmlFor={`option${index}`}>
              {/* 在选项前面添加 A, B, C, D */}
              {['A', 'B', 'C', 'D'][index]}: {option}
            </label>
          </div>
        ))}
      </div>

      <div className="chart">
        <h3>回答情况分布</h3>
        <div style={{ height: '250px', width: '50%' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      <button className="back-button" onClick={handleBackClick}>
                返回
      </button>
    </div>
  );
};

export default Answer;
