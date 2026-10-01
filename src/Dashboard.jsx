import { useState, useEffect } from "react";
import { getCurrentUser, logoutAccount, setToken, updateProfile } from "./api";

function Dashboard({ onNavigate }) {
  const [showBalance, setShowBalance] = useState(true);

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("nexoraBalance");
    return savedBalance ? Number(savedBalance) : 2450000;
  });

  useEffect(() => {
    localStorage.setItem("nexoraBalance", balance);
  }, [balance]);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((result) => {
        if (!active) return;
        const profile = result.data || {};
        setUser(profile);
        setSettingsName(profile.firstName || "");
        setSettingsLastName(profile.lastName || "");
        setSettingsPhone(profile.phoneNumber || "");
        setSettingsEmail(profile.email || "");
      })
      .catch(() => {
        if (!active) return;
        setToken(null);
        onNavigate("login");
      });

    return () => {
      active = false;
    };
  }, [onNavigate]);

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [addError, setAddError] = useState("");
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
  const [section, setSection] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [settingsName, setSettingsName] = useState("");
  const [settingsLastName, setSettingsLastName] = useState("");
  const [settingsPhone, setSettingsPhone] = useState("");
  const [settingsEmail, setSettingsEmail] = useState("");
  const [profileError, setProfileError] = useState("");

  const menuItems = [
    { id: "dashboard", icon: "⌂", label: "Dashboard" },
    { id: "accounts", icon: "▣", label: "Accounts" },
    { id: "transactions", icon: "↔️", label: "Transactions" },
    { id: "payments", icon: "↗️", label: "Payments" },
    { id: "cards", icon: "▤", label: "Cards" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const sectionCopy = {
    dashboard: {
      greeting: "Good morning 👋",
      title: "Welcome back, Joshua",
    },
    accounts: {
      greeting: "Accounts",
      title: "Your accounts",
    },
    transactions: {
      greeting: "Activity",
      title: "Transactions",
    },
    payments: {
      greeting: "Move money",
      title: "Payments",
    },
    cards: {
      greeting: "Cards",
      title: "Your cards",
    },
    settings: {
      greeting: "Preferences",
      title: "Settings",
    },
  };
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
  const closeAddMoney = () => {
    setShowAddMoney(false);
    setAddAmount("");
    setAddError("");
  };

  const handleAddMoney = () => {
    const numericAmount = Number(addAmount);

    if (!addAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setAddError("Please enter a valid amount.");
      return;
    }

    setBalance((currentBalance) => currentBalance + numericAmount);
    setTransactions((currentTransactions) => [
      {
        name: "Money Added",
        amount: numericAmount,
        time: "Just now",
      },
      ...currentTransactions,
    ]);
    showToast(
      "success",
      "Money Added Successfully!",
      `₦${numericAmount.toLocaleString()} has been added to your account.`
    );
    closeAddMoney();
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
        `${service} Payment Successful!`,
        `₦${amount.toLocaleString("en-NG")} payment was successful.`
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
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`dashboard-nav-item${
                section === item.id ? " active" : ""
              }`}
              onClick={() => setSection(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="dashboard-logout"
          onClick={async () => {
            try {
              await logoutAccount();
            } catch {
              // The local session is cleared either way.
            }
            setToken(null);
            onNavigate("login");
          }}
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
            <p className="dashboard-greeting">{sectionCopy[section].greeting}</p>
            <h1>
              {section === "dashboard"
                ? `Welcome back, ${user?.firstName || "there"}`
                : sectionCopy[section].title}
            </h1>
          </div>

          <div className="dashboard-header-actions">
            <button className="dashboard-notification">
              🔔
            </button>

            <div className="dashboard-profile">
              <div className="dashboard-avatar">
                {(user?.firstName || "N").charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{user?.firstName || "Account"}</strong>
                <span>{user?.email || "Personal Account"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* BALANCE CARD */}
        {section === "dashboard" && (
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
            onClick={() => setShowAddMoney(true)}
          >
            + Add Money
          </button>
        </section>
        )}

        {/* QUICK ACTIONS */}
        {(section === "dashboard" || section === "payments") && (
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

            <button onClick={() => setShowAddMoney(true)}>
              <span>＋</span>
              <strong>Add Money</strong>
              <small>Fund your account</small>
            </button>
          </div>
        </section>
        )}

        {showAddMoney && (
          <div className="send-money-modal" onClick={closeAddMoney}>
            <div className="send-money-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">Deposit</span>
                  <h2>Add Money</h2>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={closeAddMoney}
                >
                  ×
                </button>
              </div>

              <p className="modal-subtitle">Enter the amount you want to add to your account.</p>

              <label className="modal-label" htmlFor="add-amount">Amount</label>
              <input
                id="add-amount"
                type="text"
                inputMode="numeric"
                placeholder="0.00"
                value={addAmount}
                onChange={(e) => {
                  setAddAmount(e.target.value);
                  setAddError("");
                }}
              />

              {addError && <p className="modal-error">{addError}</p>}

              <div className="send-money-actions">
                <button type="button" className="modal-btn-secondary" onClick={closeAddMoney}>
                  Cancel
                </button>
                <button type="button" className="modal-btn-primary" onClick={handleAddMoney}>
                  Add Money
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEND MONEY MODAL */}
        {showSendMoney && (
          <div className="send-money-modal" onClick={() => setShowSendMoney(false)}>
            <div className="send-money-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">Transfer</span>
                  <h2>Send Money</h2>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={() => setShowSendMoney(false)}
                >
                  ×
                </button>
              </div>

              <p className="modal-subtitle">Transfer money to another account.</p>

              <label className="modal-label" htmlFor="send-recipient">Recipient</label>
              <input
                id="send-recipient"
                type="text"
                placeholder="Recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />

              <label className="modal-label" htmlFor="send-amount">Amount</label>
              <input
                id="send-amount"
                type="text"
                inputMode="numeric"
                placeholder="0.00"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />

              <div className="send-money-actions">
                <button type="button" className="modal-btn-secondary" onClick={() => setShowSendMoney(false)}>
                  Cancel
                </button>
                <button type="button" className="modal-btn-primary" onClick={handleSendMoney}>
                  Send Money
                </button>
              </div>
            </div>
          </div>
        )}
        {/* RECEIVE MONEY MODAL */}
        {showReceiveMoney && (
          <div className="send-money-modal" onClick={() => setShowReceiveMoney(false)}>
            <div className="send-money-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">Deposit</span>
                  <h2>Receive Money</h2>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={() => setShowReceiveMoney(false)}
                >
                  ×
                </button>
              </div>

              <p className="modal-subtitle">Enter the amount you want to receive.</p>

              <label className="modal-label" htmlFor="receive-amount">Amount</label>
              <input
                id="receive-amount"
                type="text"
                inputMode="numeric"
                placeholder="0.00"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
              />

              <div className="send-money-actions">
                <button type="button" className="modal-btn-secondary" onClick={() => setShowReceiveMoney(false)}>
                  Cancel
                </button>
                <button type="button" className="modal-btn-primary" onClick={handleReceiveMoney}>
                  Receive Money
                </button>
              </div>
            </div>
          </div>
        )}
        {/* PAY BILLS MODAL */}
        {showPayBills && (
          <div
            className="send-money-modal"
            onClick={() => {
              setShowPayBills(false);
              setBillType("");
              setBillAmount("");
            }}
          >
            <div
              className="send-money-box pay-bills-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">Bills</span>
                  <h2>Pay Bills</h2>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowPayBills(false);
                    setBillType("");
                    setBillAmount("");
                  }}
                >
                  ×
                </button>
              </div>

              <p className="modal-subtitle">Select the service you want to pay for.</p>

              <div className="bill-options">

                <button
                   type="button"
                   className={billType === "Electricity" ? "active" : undefined}
                   onClick={() => setBillType("Electricity")}
                 >
                   <span>⚡</span>
                   <strong>Electricity</strong>
                   <small>Pay electricity bills</small>
                 </button>

                 <button
                   type="button"
                   className={billType === "airtime" ? "active" : undefined}
                   onClick={() => setBillType("airtime")}
                 >
                   <span>📱</span>
                   <strong>Airtime</strong>
                   <small>Buy airtime</small>
                 </button>

                 <button
                   type="button"
                   className={billType === "data" ? "active" : undefined}
                   onClick={() => setBillType("data")}
                 >
                   <span>🌐</span>
                   <strong>Data</strong>
                   <small>Buy data bundles</small>
                 </button>

                 <button
                   type="button"
                   className={billType === "Cable TV" ? "active" : undefined}
                   onClick={() => setBillType("Cable TV")}
                 >
                   <span>📺</span>
                   <strong>Cable TV</strong>
                   <small>Pay TV subscription</small>
                 </button>

                 <button
                   type="button"
                   className={billType === "Water" ? "active" : undefined}
                   onClick={() => setBillType("Water")}
                 >
                   <span>💧</span>
                   <strong>Water</strong>
                   <small>Pay water bills</small>
                 </button>

                 <button
                   type="button"
                   className={billType === "Internet" ? "active" : undefined}
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
                    value={billAmount}
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
           <div className="send-money-actions">
             <button
               type="button"
               className="modal-btn-secondary"
               onClick={() => {
                 setShowPayBills(false);
                 setBillType("");
                 setBillAmount("");
               }}
             >
               Cancel
             </button>
           </div>
            </div>
          </div>
        )}
       
        {/* OVERVIEW */}
        {section === "dashboard" && (
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
        )}

        {/* TRANSACTIONS */}
        {(section === "dashboard" || section === "transactions") && (
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
        )}

        {section === "accounts" && (
          <section className="account-grid">
            <article className="account-card">
              <p>Checking</p>
              <h2>Personal Account</h2>
              <span>•••• 4821</span>
              <strong>
                ₦{balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </strong>
            </article>

            <article className="account-card">
              <p>Savings</p>
              <h2>Goal Savings</h2>
              <span>•••• 9012</span>
              <strong>₦850,000.00</strong>
            </article>
          </section>
        )}

        {section === "cards" && (
          <section className="cards-page">
            <div className="bank-card">
              <div className="bank-card-top">
                <strong>Nexora</strong>
                <span>VISA</span>
              </div>
              <p className="bank-card-number">•••• •••• •••• 4821</p>
              <div className="bank-card-bottom">
                <span>JOSHUA</span>
                <span>12/29</span>
              </div>
            </div>

            <div className="dashboard-panel card-details-panel">
              <h2>Card details</h2>
              <p>Primary debit card linked to your personal account.</p>
              <ul>
                <li><span>Status</span><strong>Active</strong></li>
                <li><span>Daily limit</span><strong>₦500,000</strong></li>
                <li><span>Billing address</span><strong>Lagos, Nigeria</strong></li>
              </ul>
            </div>
          </section>
        )}

        {section === "settings" && (
          <section className="dashboard-panel settings-panel">
            <form
              className="settings-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setProfileError("");
                try {
                  const result = await updateProfile({
                    firstName: settingsName.trim(),
                    lastName: settingsLastName.trim(),
                    phoneNumber: settingsPhone.trim(),
                  });
                  setUser(result.data);
                  showToast(
                    "success",
                    "Profile updated",
                    result.message || "Your profile has been updated."
                  );
                } catch (error) {
                  setProfileError(error.message);
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="settings-name">First name</label>
                <input
                  id="settings-name"
                  type="text"
                  value={settingsName}
                  onChange={(e) => setSettingsName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-last-name">Last name</label>
                <input
                  id="settings-last-name"
                  type="text"
                  value={settingsLastName}
                  onChange={(e) => setSettingsLastName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-phone">Phone number</label>
                <input
                  id="settings-phone"
                  type="tel"
                  value={settingsPhone}
                  onChange={(e) => setSettingsPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-email">Email</label>
                <input
                  id="settings-email"
                  type="email"
                  value={settingsEmail}
                  readOnly
                />
              </div>

              {profileError && <p className="error-message">{profileError}</p>}

              <button type="submit" className="auth-primary-button">
                Save profile
              </button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}

export default Dashboard;