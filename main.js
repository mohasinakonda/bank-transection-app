// nav section
const welcome_msg = document.querySelector(".welcome-msg")
const user_name = document.querySelector("#user-name")
const user_id = document.querySelector("#user-id")
const user_login = document.querySelector(".login")
const main_app = document.querySelector(".main-app")

const movement_area = document.querySelector(".main-row")
// overview section
const main_balance = document.querySelector(".overview-balance")
const overview_date = document.querySelector(".date")
const close_msg=document.querySelector('.close-msg')
const warning_msg=document.querySelector('.warning-msg')
const warning_section=document.querySelector('.warning')


// transfer money
const transfer_money_to = document.querySelector("#transfer-money-to")
const transfer_amount = document.querySelector("#transfer-money-amount")
const transfer_btn = document.querySelector(".transfer")

// loan

const loan_money_amount = document.querySelector("#loan")
const loan_money_btn = document.querySelector(".loan-money")

// close account
const close_account_user = document.querySelector("#close-account")
const close_account_id = document.querySelector("#close-account-id")
const account_close_btn = document.querySelector(".close")

// summery
const summery_in = document.querySelector(".in")
const summery_out = document.querySelector(".out")
const summery_interest = document.querySelector(".interest")

//  sort
const sort_btn = document.querySelector(".sort")

const show_deposit=document.querySelector('.sort--deposit')
const show_withdraw=document.querySelector('.sort--withdraw')

const show_all=document.querySelector('.all')


const help_desk = document.querySelector(".help")
// logout
const log_out = document.querySelector(".logout_btn")

// user account section
const user_section = document.querySelector(".create-account")




const account1 = {
	name: "Mohasin akonda",
	deposit: [1200, -1300, 2300, 405, -564, 6000, -300, 5000],
	pin: 1111,
	interestRate: 1.3,
}

const account2 = {
	name: "Shojib Mahmud",
	deposit: [1000, 1300, -2300, 405, -564, 6000, -300],
	pin: 2222,
	interestRate: 0.8,
}

const account3 = {
	name: "Riazul islam ratul",
	deposit: [1000, 1300, -2300, 405, -564, 6000, -300, 5000],
	pin: 3333,
	interestRate: 1.01,
}

const accounts = [account1, account2, account3]

// create user name
accounts.forEach((account) => {
	account.username = account.name
		.split(" ")
		.map((user) => user[0].toLowerCase())
		.join("")
})

function show_total_summery(account) {
	const total_deposit = account.deposit
		.filter((value) => value > 0)
		.reduce((acc, cur) => acc + cur)
	summery_in.textContent = `$ ${total_deposit}`

	const total_withdraw = account.deposit
		.filter((v) => v < 0)
		.reduce((acc, cur) => acc + cur)

	summery_out.textContent = `$ ${Math.abs(total_withdraw)}`

	const total_interest = Math.trunc(
		(total_deposit * account.interestRate) / 100,
	)

	summery_interest.textContent = `$ ${total_interest}`
}

function show_movements(account) {

	
	account?.forEach((value, index) => {
		const movements = value > 0 ? "Deposit" : "Withdraw"

		const html = `
        <section class="transection-row">
            <p class="transection-type movement-type--${movements}">${
			index + 1
		} ${movements}</p>
            <p class="transection-date">12/12/12</p>
            <p class="transection-value">$${value}</p>
        </section>`

		movement_area.insertAdjacentHTML("afterbegin", html)
	})
}

function show_msg(account) {
	welcome_msg.textContent = account.name.split(" ")[0]
}

let current_balance

function curr_user_main_balance(account) {
	current_balance = account.deposit.reduce((acc, cur) => acc + cur)
	main_balance.textContent = `$ ${current_balance}`
}

// user login

function updateUI(account) {
	show_movements(account.deposit)
	show_msg(account)
	curr_user_main_balance(account)

	show_total_summery(account)
}
let current_user
let unsorted
// LOGIN SECTION/////////////////////
user_login.addEventListener("click", function (e) {
	e.preventDefault()
	const user_value = user_name.value
	const userId = parseInt(user_id.value)

	accounts.forEach((account, i) => {
		if (account.username === user_value && account.pin === userId) {
			current_user = account
			unsorted=account.deposit
			log_out.classList.add("hidden")

			help_desk.style.opacity = 0
			main_app.classList.add("show")
			user_section.style.opacity = 0
			user_section.style.transition = ".5s"
			updateUI(account)
		}
	})

	user_name.value = ""
	user_id.value = ""
})

function warning(msg,color){
	warning_msg.textContent=msg
	warning_msg.style.color=color
	warning_section.style.display='block'
}

// 	LOAN SECTION///////////////////
function loan_approve_delay(){
	const loan = parseInt(loan_money_amount.value)
	const loan_amount=current_balance*.40
	movement_area.innerHTML = ""

	// here loan limit is fixed CURRENT BALANCES 40%
	if (loan<=loan_amount) {


		warning('your loan is approve','rgba(79, 224, 79,1)')


		current_user.deposit.push(loan)
		updateUI(current_user)
	} else if(!loan){
	warning('please inter your loan amount (:','red')
	updateUI(current_user)
	}
	
	else{
		warning('your requested loan amount is too high','red')
		updateUI(current_user)
	}

	// updateUI(current_user)
	loan_money_amount.value = ""


}

loan_money_btn.addEventListener("click", function (e) {
	e.preventDefault()
	
	warning('your request is progress....','black' )
	// LOAN IS APPROVE AFTER 3S LATER

	setTimeout(loan_approve_delay,3000)
})

//TRANSFER SECTION////////////////
function clearInput() {
	transfer_money_to.value = ""
	transfer_amount.value = ""
}

function warning_msg_creation(curr_acc,input_value,amount){
	if(curr_acc?.username!==input_value){
		warning('invalid username!','red')
	}else if(amount>current_balance){
		warning('your requested amount is greater than current balance !','red')
	}else if(input_value===current_user?.username){
		warning(`can't transfer money on your account! ):` ,'red')
	}
}


function delay_transfer(){

	const receiver_user_name = transfer_money_to.value
	const transfer_amount_of_money = Number(transfer_amount.value)
	const acc = accounts.find((acc) => acc.username === receiver_user_name)

	warning_msg_creation(acc,receiver_user_name,transfer_amount_of_money)
	// console.log(acc)
	if (
		acc?.username === receiver_user_name &&
		receiver_user_name !== current_user.username &&
		transfer_amount_of_money > 0 &&
		transfer_amount_of_money < current_balance &&
		receiver_user_name != "" &&
		transfer_amount_of_money != ""
	) {
		movement_area.innerHTML = ""
		current_user.deposit.push(-transfer_amount_of_money)
		acc.deposit.push(transfer_amount_of_money)
		clearInput()
		updateUI(current_user)
		warning('transfer is successful! :(','green')
		
	} else {
		clearInput()
		return
	}
}

transfer_btn.addEventListener("click", function () {
	
warning('processing for approve...','black')
	setTimeout(delay_transfer,3000)
})



log_out.addEventListener("click", function () {
	delete updateUI(current_user)
	// main_app.innerHTML=''
	movement_area.innerHTML = ""
	welcome_msg.innerHTML = "Please login"
	log_out.classList.remove("hidden")
	user_section.style.opacity = 1
	help_desk.style.opacity = 1
	main_app.classList.remove("show")
})


close_msg.addEventListener('click',function(){
	warning_section.style.display='none'
})


sort_btn.addEventListener('click',function(e){
	e.preventDefault()
	//reload movements section
	movement_area.innerHTML=''
	unsorted.sort((a,b)=>a-b)
	//for update movements
	show_movements(current_user.deposit)
})


show_deposit.addEventListener('click',function(){
	movement_area.innerHTML=''

	const deposit_value=current_user.deposit.filter(v=>v>0)
	show_movements(deposit_value)
})

show_withdraw.addEventListener('click',function(){
	movement_area.innerHTML=''

	const withdraw_value=current_user.deposit.filter(v=>v<0)
	show_movements(withdraw_value)
})

show_all.addEventListener('click',function(){
	movement_area.innerHTML=''
	show_movements(current_user.deposit)
})