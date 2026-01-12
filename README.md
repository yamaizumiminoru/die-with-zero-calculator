# Die With Zero Calculator
[![DOI](https://zenodo.org/badge/1132742997.svg?v=1)](https://doi.org/10.5281/zenodo.18221543)

A web-based calculator inspired by *Die With Zero* (Bill Perkins),
designed to help users estimate the **required assets at retirement** in order to reach zero assets at a chosen end-of-life age.

This application combines a modern, intuitive UI with a clear financial logic model, allowing users to explore different retirement and spending scenarios interactively.

---

## ✨ Features

- **Modern UI**
  - Dark mode with a glassmorphism-style interface
  - Clean layout designed for exploration and comparison of scenarios

- **Interactive Inputs**
  - Adjustable parameters including:
    - Retirement age
    - Target age at death
    - Monthly expenses
    - Pension income
    - Real annual yield
    - Initial buffer
  - Real-time recalculation as inputs change

- **Visual Asset Trajectory**
  - An interactive chart showing asset depletion from retirement to the target age
  - Immediate visual feedback for scenario analysis

- **Clear Financial Logic**
  - Computes the present value of future deficits
    (monthly expenses minus pension income),
    discounted by the specified real yield
  - Adds an initial buffer to determine the required assets at retirement

---

## 🧠 Calculation Logic (Overview)

1. Calculate the monthly deficit:
   monthly expenses − monthly pension income

2. Project the series of future deficits from retirement age to the target age.

3. Discount all future deficits back to the retirement date using the real annual yield.

4. Add the initial buffer to obtain the **required assets at retirement**.

This model prioritizes conceptual clarity and interpretability over financial engineering complexity.

---

## 🚀 How to Run (Local Development)

### Requirements
- Node.js (recommended: latest LTS)

### Steps

1. Clone this repository:
   git clone https://github.com/your-username/die-with-zero-calculator.git

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Open the local URL shown in the terminal
   (typically http://localhost:5173/) in your browser.

---

## 🛠️ Built With

- React
- Vite
- JavaScript

---

## 📄 License

MIT License

---

## 🔍 Notes

This project was developed as an exploratory tool for personal finance thinking and scenario analysis.
It is **not intended as financial advice**.

The emphasis is on conceptual clarity, visual intuition, and ease of experimentation.

---

# Die With Zero Calculator（日本語）

本アプリケーションは、Bill Perkins の著書 *Die With Zero* に着想を得た、
**退職時点で必要となる資産額**を試算するための Web ベースの計算ツールです。

年齢・支出・年金・利回りなどの条件を調整しながら、
資産推移を直感的に確認することができます。

---

## ✨ 主な機能

- **モダンなUI**
  - ダークモードを基調としたガラス調デザイン
  - シナリオ比較に適したシンプルな画面構成

- **インタラクティブな入力項目**
  - 退職年齢、想定寿命、支出、年金、利回り、初期バッファを調整可能
  - 入力変更に応じて即座に再計算

- **資産推移の可視化**
  - 退職から最終年齢までの資産減少をグラフで表示

- **透明性の高い計算ロジック**
  - 月次赤字を基準に将来キャッシュフローを算出
  - 割引現在価値で退職時必要資産を計算

---

## 🚀 実行方法（ローカル）

1. リポジトリをクローン
2. npm install
3. npm run dev
4. 表示されたURLをブラウザで開く

---

## 🔍 注意事項

本ツールは、個人のライフプランや資産設計について考えるための
探索的ツールです。
金融アドバイスを目的としたものではありません。
