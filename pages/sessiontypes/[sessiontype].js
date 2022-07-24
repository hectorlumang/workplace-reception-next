import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import card_image from './../../public/img/card.png'

import axios from 'axios';

function validateField(e) {
    return e;
}

function gotoCompDrinks(e) {
    e.preventDefault;
    var proceedtoCompDrinks = false;
    //get field values
    if ( document.querySelector("input.customer-name-input").value == "" ) {
        //required customer name field is blank
        alert("Please enter your name.");
        document.querySelector("input.customer-name-input").focus();
    } else {
        proceedtoCompDrinks = true;
    }

    if (proceedtoCompDrinks) {
        var prodcardno = document.querySelector("input.prod-card-no-input").value;
        var sessiontype = document.querySelector("input.selected-session-type").value;

        //modify next button to show processing icon
        document.querySelector("div.btn-text.btn-next").innerHTML = "<i class='fa fa-cog fa-spin'></span>";

        if (prodcardno != "") {
            window.location.href = "/compdrinks?prodcardno=" + prodcardno.toString() + "&sessiontype=" + sessiontype;
        } else {
            //no prod card no - send customername instead
            var customername = document.querySelector("input.customer-name-input").value;
            window.location.href = "/compdrinks?customername=" + customername + "&sessiontype=" + sessiontype;
        }
    }
    
    //go to CompDrinks page
    return true;
}

function selectProdcard(e) {
    var selected_tab = e.target;
    console.log(selected_tab);
    //console.log("ln-21 prod-card-no[" + selected_tab.indexOf("prod-card-no") + "]");
    document.querySelector("div.productivity-card-search-mode.prod-card-no").classList.remove("selected");
    document.querySelector("div.productivity-card-search-mode.prod-card-email").classList.remove("selected");
    if (selected_tab.classList.contains("prod-card-no")) {
        //console.log("clicked on prod-card-no");
        document.querySelector("div.prod-card-email-entry").classList.add("element-invisible");
        document.querySelector("div.prod-card-no-entry").classList.remove("element-invisible");

        document.querySelector("div.productivity-card-search-mode.prod-card-no").classList.add("selected");

        document.querySelector("input.prod-card-no-input").value = "";

    } else {
        //console.log("selected on prod-card-email");
        document.querySelector("div.prod-card-email-entry").classList.remove("element-invisible");
        document.querySelector("div.prod-card-no-entry").classList.add("element-invisible");

        document.querySelector("div.productivity-card-search-mode.prod-card-email").classList.add("selected");

        document.querySelector("input.prod-card-email-input").value = "";
    }
}

function validateProdCardNo() {
    //var wpc_ip_address = "159.65.1.49";
    //TODO - get wpc_ip_address setting from the settings page
    var wpc_ip_address = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
    var prodcardno = document.querySelector("input.prod-card-no-input").value;
    var validate_url = "http://" + wpc_ip_address + "/workplace/app/check-registration";
    //validate prod-card-no then update the Customer Name field with the validated prod-card-no

    if (prodcardno.length >= 3) {
        axios
            .post(validate_url, {
                prod_card_no: prodcardno
            })
            .then(response => {
                //console.log(response.data);
                //console.log(response.status);
                if (response.status == "200") {
                    const customer = response.data;
                    console.log(customer);

                    if (customer.customername) {
                        document.querySelector("input.customer-name-input").value = customer.customername;
                        document.querySelector("input.customer-prod-card-no").value = customer.prodcardno;
                        document.querySelector("div.prod-card-no-result").innerHTML = "<span style='color: green'>Card OK</span>"; 
                    } else {
                        document.querySelector("div.prod-card-no-result").innerHTML = "<span style='color: red'>Invalid Card No.</span>";                     }
                }

            });
    
    } else {
        document.querySelector("input.customer-name-input").value = "";
        document.querySelector("div.prod-card-no-result").innerHTML = "";
    }
    return true;
}

function validateProdCardEmail() {
    //validate prod-card-email then update the Customer Name field with the validated prod-card-email
    var prodcardemail = document.querySelector("input.prod-card-email-input").value;
    var wpc_ip_address = "159.65.1.49";
    //TODO - get wpc_ip_address setting from the settings page
    var validate_url = "http://" + wpc_ip_address + "/workplace/app/check-registration";
    //validate prod-card-no then update the Customer Name field with the validated prod-card-no

    if (prodcardemail.length >= 3) {
        axios
            .post(validate_url, {
                email: prodcardemail
            })
            .then(response => {
                //console.log(response.data);
                //console.log(response.status);
                if (response.status == "200") {
                    const customer = response.data;
                    console.log(customer);

                    if (customer.customername) {
                        document.querySelector("input.customer-name-input").value = customer.customername;
                        document.querySelector("div.prod-card-no-result").innerHTML = "<span style='color: green'>Card OK</span>"; 
                    } else {
                        document.querySelector("div.prod-card-no-result").innerHTML = "<span style='color: red'>Invalid Card No.</span>";                     }
                }

            });
    
    } else {
        document.querySelector("input.customer-name-input").value = "";
        document.querySelector("div.prod-card-no-result").innerHTML = "";
    }

    return true;
}


function sessionTypeInfoPage() {
    const router = useRouter();
    const {sessiontype} = router.query

    var sessiontypestring = "Hourly";
    var sessiontypecode = 1;

    console.log( {sessiontype} );

    switch( sessiontype ) {
        case "hourly": sessiontypestring = "Hourly"; sessiontypecode=1; break;
        case "daily": sessiontypestring = "Day Pass"; sessiontypecode=2; break;
        case "overnight": sessiontypestring = "Overnight"; sessiontypecode=15; break;
        case "weekly": sessiontypestring = "Weekly"; sessiontypecode=3; break;
        case "monthly": sessiontypestring = "Monthly"; sessiontypecode=4; break;
        case "meetingroom": sessiontypestring = "Meeting Room"; sessiontypecode=2000; break;
    }

    //if ( sessiontype == "daily") { sessiontypestring = "Day Pass"; }

    return (
        <div class="session-detail-page">
            <Head>
                <title>Workplace Cafe Reception - Personal Info</title>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <meta name="description" content="Workplace Cafe Reception Application" />
                <link rel="icon" href="/workplace-cafe-logo.ico" />
            </Head>

            <div class="breadcrumbs">
                <div class="breadcrumb home-link">
                    <span>
                        <i class="fa fa-home home-link-icon"></i>
                    </span>
                    <Link href="/">Home</Link>
                </div>
                <div class="breadcrumb session-types-link">
                    <span>
                        <i class="fa fa-chevron-right stay-options-link-icon"></i>
                    </span>
                    <Link href="/sessiontypes">Stay Options</Link>
                </div>
                <div class="breadcrumb selected-session-type session-types-link current">
                    <span>
                        <i class="fa fa-chevron-right stay-options-link-icon"></i>
                    </span>
                    <span class="selected-session-type">{sessiontypestring}</span> : Personal Info
                </div>
            </div>

            <div class="personal-info-form-container">
                <div class="session-type-selection-text"><b>Awesome!</b> You selected <span class="selected-session-type"><b>{sessiontypestring}</b></span></div>
                <div class="session-type-input-personal-info-text">Please input your personal information.</div>

                <form name="personal-info-form" class="personal-info-form">
                    <div class="row">
                        <div class="col col-md-6">
                            <div class="form-group">
                                <label>Name</label>
                                <input class="form-control customer-name-input" name="customer-name" placeholder="Enter your name" required />
                                <small>Please enter your full name</small>
                                <input type="hidden" class="selected-session-type" name="selected-session-type" value={sessiontypecode} required />
                                <input type="hidden" class="customer-prod-card-no" name="customer-prod-card-no" required />
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div class="form-group">
                                <label>Email (optional)</label>
                                <input class="form-control customer-email-input" name="customer-email" placeholder="Enter your email (optional)" onChange={validateField}/>
                                <small>Please enter your email address. (optional)</small>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-12 session-detail-connect-via-text">
                            or connect via
                        </div>
                    </div>
                    <div class="row productivity-card-search-mode-options">
                        <div class="col col-md-6">
                            <div class="productivity-card-search-mode prod-card-no selected" onClick={selectProdcard}>Productivity Card</div>
                        </div>
                        <div class="col col-md-6">
                            <div class="productivity-card-search-mode prod-card-email" onClick={selectProdcard}>Email Address</div>
                        </div>
                    </div>
                    <div class="row productivity-card-search-mode-details">
                        <div class="col col-md-12 prod-card-no-entry">
                            <div class="prod-card-no-field">
                                <div class="form-group">
                                    <label>Productivity Card No.</label>
                                    <input class="form-control prod-card-no-input" name="prod-card-no-input" placeholder="0000000000" onChange={validateProdCardNo}/>
                                    <div class="prod-card-image-container">
                                        <Image src={card_image} class="productivity-card-image" alt="productivity-card" />
                                    </div>
                                    <small>Enjoy the benefits of having your own Productivity Card!<br></br>Approach our barista and sign up now.</small>
                                    <div class="prod-card-no-result"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-12 prod-card-email-entry element-invisible">
                            <div class="prod-card-email-field">
                                <div class="form-group">
                                    <label>Productivity Card Email</label>
                                    <input class="form-control prod-card-email-input" name="prod-card-email-input" placeholder="email@domain.com" onChange={validateProdCardEmail}/>
                                    <div class="prod-card-image-container">
                                        <Image src={card_image} class="productivity-card-image" alt="productivity-card" />
                                    </div>
                                    <small>Enjoy the benefits of having your own Productivity Card!<br></br>Approach our barista and sign up now.</small>
                                    <div class="prod-card-email-result"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row back-next-row">
                        <div class="col col-md-8">&nbsp;</div>
                        <div class="col col-md-4">
                            <div class="row">
                                <div class="col col-md-6">
                                    <Link href="/sessiontypes">
                                        <div class="btn-text btn-back">Back</div>
                                    </Link>
                                </div>
                                <div class="col col-md-6">
                                    <Link href="#">
                                           <div class="btn-text btn-next" onClick={gotoCompDrinks}>Next</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div> 

        </div>
    );
}

export default sessionTypeInfoPage;