import { useState, useEffect } from "react";

function Dashboard({ onNavigate }) {
  const [showBalance, setShowBalance] = useState(true);

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("nexoraBalance");
    return savedBalance ? Number(savedBalance) : 2450000;
  });

  useEffect(() => {
    localStorage.setItem("nexoraBalance", balance);
  }, [balance]);

  const [showSendMoney, setShowSendMoney] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [showReceiveMoney, setShowReceiveMoney] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showPayBills, setShowPayBills] = useState(false);
  const [billType, setBillType] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastTimer, setToastTimer] =useState(null);
const [transactions, setTransactions] = useState([
  {
    name: "Online Shopping",
    amount: -45000,
    time: "Today, 10:42 AM",
  },
  {
    name: "Salary Payment",
    amount: 450000,
    time: "Yesterday, 9:15 AM",
  },
  {
    name: "Electricity Bill",
    amount: -25500,
    time: "Sep 8, 3:20 PM",
  },
]);
const showToast = (type, title, message) => {
  setToast({
    type,
    title,
    message,
  });

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  const timer = setTimeout(() => {
    setToast(null);
  }, 4000);

  setToastTimer(timer);
};
  const handleAddMoney = () => {
   const amount = prompt("Enter amount to add:");

  if (!amount) return;

  const numericAmount = Number(amount);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  setBalance((currentBalance) => currentBalance + numericAmount);
  showToast(
    "success",
    "Money Added Successfully!",
     `₦${numericAmount.toLocaleString()} has been added to your account.`
  );
  };

   const handleSendMoney = () => {
    if (!recipient.trim()) {
      alert("Please enter a recipient name.");
      return;
    }

    const amount = Number(sendAmount);

    if (!sendAmount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amount > balance) {
      alert("Insufficient balance.");
      return;
    }

    setBalance((currentBalance) => currentBalance - amount);
    setTransactions((currentTransactions) => [
      {
        name: `Transfer to ${recipient}`,
        amount: -amount,
        time: "Just now",
      },
     ...currentTransactions
 ]);

    showToast(
      "success",
      "Money Sent Successfully!",
      `₦${amount.toLocaleString()} has been sent to ${recipient}.`
    );

    setRecipient("");
    setSendAmount("");
    setShowSendMoney(false);
   };
    
    const handleReceiveMoney = () => {
    const amount = Number(receiveAmount);

    if (!receiveAmount || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
   }

  setBalance((currentBalance) => currentBalance + amount);
  setTransactions((currentTransactions) => [
    {
      name: "Money Received",
      amount: amount,
      time: "Just now",
    },
    ...currentTransactions,
  ]);

  showToast(
    "success",
    "Money Received Successfully!",
     `₦${amount.toLocaleString()} has been added to your account.`
   );

   setReceiveAmount("");
   setShowReceiveMoney(false);
};
     const handleBillPayment = (service) => {
       const amount = Number(billAmount);

       if (!billAmount || Number.isNaN(amount) || amount <= 0) {
         alert("Please enter a valid amount.");
         return;
       }

       if (amount > balance) {
         alert("Insufficient balance.");
         return;
       }

       setBalance((currentBalance) => currentBalance - amount);

       setTransactions((currentTransactions) => [
         {
           name: service + " Payment",
           amount: -amount,
           time: "Just now",
         },
         ...currentTransactions,
      ]);

      showToast(
        "success",
        ` ${service} Payment Successful!,`
        ` ₦${amount.toLocaleString("en-NG")} payment was successful.`
      );

      setBillAmount("");
      setShowPayBills(false);
      setBillType("");
};

return (

    <div className="dashboard-page">
       {toast && (
         <div className={`toast-notification ${toast.type}`}>
           <div className="toast-icon">
             ✓
           </div>

           <div className="toast-content">
             <strong>{toast.title}</strong>
             <p>{toast.message}</p>
          </div>

          <button
            type="button"
            className="toast-close"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <span className="dashboard-logo-dot"></span>
          Nexora
        </div>

        <nav className="dashboard-nav">
          <button className="dashboard-nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="dashboard-nav-item">
            <span>▣</span>
            Accounts
          </button>

          <button className="dashboard-nav-item">
            <span>↔️</span>
            Transactions
          </button>

          <button className="dashboard-nav-item">
            <span>↗️</span>
            Payments
          </button>

          <button className="dashboard-nav-item">
            <span>▤</span>
            Cards
          </button>

          <button className="dashboard-nav-item">
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <button
          className="dashboard-logout"
          onClick={() => onNavigate("login")}
        >
          <span>↪️</span>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">Good morning 👋</p>
            <h1>Welcome back, Joshua</h1>
          </div>

          <div className="dashboard-header-actions">
            <button className="dashboard-notification">
              🔔
            </button>

            <div className="dashboard-profile">
              <div className="dashboard-avatar">J</div>
              <div>
                <strong>Joshua</strong>
                <span>Personal Account</span>
              </div>
            </div>
          </div>
        </header>

        {/* BALANCE CARD */}
        <section className="dashboard-balance-card">
          <div>
            <p>
              Total Balance
              <button
                type="button"
                className="balance-toggle"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? "👁️" : "🙈"}
              </button>
            </p>

            <h2>
              {showBalance
                ? `₦${balance.toLocaleString("en-NG", {
                   minimumFractionDigits: 2,
                  })}`
                : "••••••••"}
            </h2>

            <span className="balance-status">
              ↑ 12.5% this month
            </span>
          </div>

          <button
            type="button"
            className="balance-action"
            onClick={handleAddMoney}
          >
            + Add Money
          </button>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions">
              <button onClick={() => setShowSendMoney(true)}>
              <span>↗️</span>
              <strong>Send Money</strong>
              <small>Transfer funds</small>
            </button>

            <button onClick={() => setShowReceiveMoney(true)}>
              <span>↓</span>
              <strong>Receive Money</strong>
              <small>Get paid instantly</small>
            </button>

            <button onClick={() => setShowPayBills(true)}>
              <span>▣</span>
              <strong>Pay Bills</strong>
              <small>Pay your bills</small>
            </button>

            <button  onClick={handleAddMoney}>
              <span>＋</span>
              <strong>Add Money</strong>
              <small>Fund your account</small>
            </button>
          </div>
        </section>

        {/* SEND MONEY MODAL */}
        {showSendMoney && (
          <div className="send-money-modal">
            <div className="send-money-box">

              <h2>Send Money</h2>

               <p>Transfer money to another account.</p>

               <input
                 type="text"
                 placeholder="Recipient name"
                 value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                 
              />

              <input
                type="text"
                inputMode="numeric"
                 placeholder="Amount"
                 value={sendAmount}
                 onChange={(e) => setSendAmount(e.target.value)}
              />         

              <div className="send-money-actions">
                <button
                  type="button"
                  onClick={() => setShowSendMoney(false)}
                >
                   Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSendMoney}
                >
                  Send Money
                </button>
             </div>

           </div>
         </div>
        )}
        {/* RECEIVE MONEY MODAL */}
        {showReceiveMoney && (
          <div className="send-money-modal">
            <div className="send-money-box">

              <h2>Receive Money</h2>

              <p>Enter the amount you want to receive.</p>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Amount"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
              />

              <div className="send-money-actions">

                <button
                  type="button"
                  onClick={() => setShowReceiveMoney(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReceiveMoney}
                >
                  Receive Money
                </button>
              </div>

            </div>
          </div>
        )}
        {/* PAY BILLS MODAL */}
        {showPayBills && (
          <div className="send-money-modal">
            <div className="send-money-box">

              <h2>Pay Bills</h2>

              <p>Select the service you want to pay for.</p>

              <div className="bill-options">

                <button
                   type="button"
                   onClick={() => setBillType("Electricity")}
                 >
                   <span>⚡</span>
                   <strong>Electricity</strong>
                   <small>Pay electricity bills</small>
                 </button>

                 <button
                   type="button"
                   onClick={() => setBillType("airtime")}
                 >
                   <span>📱</span>
                   <strong>Airtime</strong>
                   <small>Buy airtime</small>
                 </button>

                 <button
                   type="button"
                   onClick={() => {
                     setBillType("data");
                     setShowPayBills(true);
                   }}
                 >
                   <span>🌐</span>
                   <strong>Data</strong>
                   <small>Buy data bundles</small>
                 </button>

                 <button
                   type="button"
                   onClick={() => setBillType("Cable TV")}
                 >
                   <span>📺</span>
                   <strong>Cable TV</strong>
                   <small>Pay TV subscription</small>
                 </button>

                 <button
                   type="button"
                   onClick={() => {
                     setBillType("Water");
                     setShowPayBills(true);
                   }}
                 >
                   <span>💧</span>
                   <strong>Water</strong>
                   <small>Pay water bills</small>
                 </button>

                 <button
                   type="button"
                   onClick={() => setBillType("Internet")}
                 >
                  <span>📡</span>
                  <strong>Internet</strong>
                  <small>Pay internet bills</small>
                 </button>

               </div>
               {/* ELECTRICITY PAYMENT FORM */}
               {billType === "Electricity" && (
                 <div className="bill-payment-form">

                   <h3>Pay Electricity Bill</h3>

                   <p>Enter your electricity meter details.</p>

                   <input
                     type="text"
                     placeholder="Meter Number"
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    Value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => handleBillPayment("Electricity")}
                  >
                    Pay Electricity Bill
                  </button>

                 </div>
              )}
              </div>

             {/* AIRTIME PAYMENT FORM */}

          
             {billType === "airtime" && (
               <div className="bill-payment-form">
               <h3>Buy Airtime</h3>
               <p>Enter the phone number and amount.</p>

              <input
                type="tel"
                placeholder="Phone Number"
                id="airtime-phone"
              />

              <input
                type="number"
                placeholder="Amount"
               id="airtime-amount"
               value={billAmount}
               onChange={(e) => setBillAmount(e.target.value)}
             />

              <button
                type="button"
                onClick={() => handleBillPayment("Airtime")}
              >
                Buy Airtime
              </button>
             </div>
           )}
           {/* DATA PAYMENT FORM */}
           {billType === "data" && (
             <div className="bill-payment-form">

               <h3>Buy Data</h3>

               <p>Enter the phone number and select your data bundle.</p>

               <input
                 type="tel"
                 placeholder="Phone Number"
                 id="data-phone"
              />

              <select id="data-bundle">
                <option value="">Select Data Bundle</option>
                <option value="1GB">1GB - ₦500</option>
                <option value="2GB">2GB - ₦1,000</option>
                <option value="5GB">5GB - ₦2,000</option>
                <option value="10GB">10GB - ₦3,500</option>
              </select>

              <input
                type="number"
                placeholder="Amount"
                id="data-amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />

              <button
                type="button"
               onClick={() => handleBillPayment("Data")}
              >
                Buy Data
              </button>

            </div>
           )}
           {/* WATER PAYMENT FORM */}
           {billType === "Water" && (
             <div className="bill-payment-form">
               <h3>Pay Water Bill</h3>
               <p>Enter your water account details.</p>

               <input
                 type="text"
                 placeholder="Account Number"
              />

              <input
                type="number"
                placeholder="Amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleBillPayment("Water")}
              >
                Pay Water Bill
              </button>
            </div>
          )}

          {/* CABLE TV PAYMENT FORM */}
          {billType === "Cable TV" && (
            <div className="bill-payment-form">
              <h3>Pay Cable TV</h3>
              <p>Enter your decoder details.</p>

              <input
                type="text"
                placeholder="Smart Card Number"
              />

              <input
                type="number"
                placeholder="Amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleBillPayment("Cable TV")}
              >
                Pay Cable TV
             </button>
            </div>
          )}

          {/* INTERNET PAYMENT FORM */}
          {billType === "Internet" && (
            <div className="bill-payment-form">
              <h3>Pay Internet Bill</h3>
              <p>Enter your internet subscription details.</p>

              <input
                type="text"
                placeholder="Customer ID"
              />

              <input
                type="number"
                placeholder="Amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleBillPayment("Internet")}
              >
                Pay Internet Bill
              </button>
             </div>
           )}
           <button
             type="button"
             onClick={() => {
               setShowPayBills(false);
               setBillType("");
               setBillAmount("");
            }}
           >
             Cancel
            </button>
            </div>
         
        )}
       
        {/* OVERVIEW */}
    
        <section className="dashboard-overview">

          <div className="dashboard-panel">
            <div className="dashboard-section-heading">
              <div>
                <p>Financial Overview</p>
                <h2>Money Overview</h2>
              </div>

              <select>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="overview-stats">
              <div>
                <span>Income</span>
                <strong>₦850,000</strong>
                <small>↑ 8.2%</small>
              </div>

              <div>
                <span>Expenses</span>
                <strong>₦320,500</strong>
                <small>↓ 4.6%</small>
              </div>

              <div>
                <span>Savings</span>
                <strong>₦529,500</strong>
                <small>↑ 15.4%</small>
              </div>
            </div>

            <div className="dashboard-chart">
              <div className="chart-line"></div>
              <div className="chart-line"></div>
              <div className="chart-line"></div>
              <div className="chart-line"></div>
              <div className="chart-line"></div>

              <div className="chart-bars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="dashboard-panel">
            <div className="dashboard-section-heading">
              <div>
                <p>Your Card</p>
                <h2>Primary Card</h2>
              </div>

              <button 
                 className="view-button"
                 onClick={() => setShowCardDetails(!showCardDetails)}
              >
                 {showCardDetails ? "Hide" :"View"}
              </button>
              
            </div>

            {showCardDetails && (
              <div className="bank-card">
              <div className="bank-card-top">
                <strong>Nexora</strong>
                <span>VISA</span>
              </div>

              <p className="bank-card-number">
                •••• •••• •••• 4821
              </p>

              <div className="bank-card-bottom">
                <span>JOSHUA</span>
                <span>12/29</span>
              </div>
            </div>
            )}
           </div>
        </section>

        {/* TRANSACTIONS */}
        <section className="dashboard-panel transactions-panel">

          <div className="dashboard-section-heading">
            <div>
              <p>Activity</p>
              <h2>Recent Transactions</h2>
            </div>

            <button 
              className="view-button"
              onClick={() => alert("Showing all recent transactions")}
            >
              View All
            </button>
          </div>

         <div className="transaction-list">
         {transactions.map((transaction, index) => (
           <div className="transaction" key={index}>

             <div className="transaction-icon">
               {transaction.amount < 0 ? "🛒" : "💼"}
             </div>

             <div className="transaction-info">
               <strong>{transaction.name}</strong>
               <span>{transaction.time}</span>
             </div>

             <strong
               className={
                 transaction.amount < 0
                   ? "transaction-expense"
                   : "transaction-income"
              }
            >
              {transaction.amount < 0 ? "-" : "+"}₦
              {Math.abs(transaction.amount).toLocaleString()}
            </strong>

        </div>
      ))}
    </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;