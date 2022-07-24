import Link from 'next/link'
import Head from 'next/head'

import { useRouter } from 'next/router'

import axios from 'axios'

import { useEffect } from "react";

function selectDrinkBlock(event) {
    const nodeList = document.querySelectorAll("div.drink-selection");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }

    //console.log(event.target.classList);
    event.target.classList.add("selected");

    //check the type of drink
    if (event.target.classList.contains("brewed-coffee")) {
        document.querySelector("input.selected-drink").value = "1";
    }
    if (event.target.classList.contains("iced-tea")) {
        document.querySelector("input.selected-drink").value = "2";
    }
    if (event.target.classList.contains("others")) {
        document.querySelector("input.selected-drink").value = "0";
    }

    return true;
}

function gotoSubmitPage() {
    //get customer-name, customer-prod-card-no, session-type, selected-drink, and then create a temporary session
    var customername = document.querySelector("input.customer-name").value;
    var customerprodcard = document.querySelector("input.customer-prod-card-no").value;
    var selecteddrink = document.querySelector("input.selected-drink").value;
    //var sessiontype = document.querySelector("input.session-type").value;
    var sessiontype = document.querySelector("input.session-type-char-code").value;
    var customeremail = document.querySelector("input.customer-email").value;

    //validate selected drink
    const nodeList = document.querySelectorAll("div.drink-selection");
    var validdrinkselection = false;
    for (let i = 0; i < nodeList.length; i++) {
        if ( nodeList[i].classList.contains("selected") ) {
            validdrinkselection = true;
        }
    }

    if (!validdrinkselection) {
        alert("Please select a drink option.");
    } else {
        //connect to server ip address and create temporary session based on customer data
        var wpc_ip_address = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
        var create_temp_session_url = "http://" + wpc_ip_address + "/workplace/app/create-temporary-session";

        //modify next button to show processing icon
        document.querySelector("div.btn-text.btn-next").innerHTML = "<i class='fa fa-cog fa-spin'></span>";
        
        axios
            .post(create_temp_session_url, {
                session_type: sessiontype,
                customer_name: customername,
                prod_card_no: customerprodcard,
                email_address: customeremail,
                contact_number: "",
                drink_selection: selecteddrink
            })
            .then(res => {
                console.log(res);
                const result = res.data;
                var saved_sessions = localStorage.getItem('saved-sessions') ? localStorage.getItem('saved-sessions') : '';
                localStorage.setItem('saved-sessions', saved_sessions + JSON.stringify(result));
                window.location.href="/confirmation";
            })
    }

    return true;
}

function CompDrinks() {
    const router = useRouter()
    /* console.log(router.query); */
    var {prodcardno} = router.query;
    var {sessiontype} = router.query;
    var {customername} = router.query;

    console.log(sessiontype);
    var sessiontypestring = "Hourly";
    var sessiontypecharcode = "hourly";
    var sessiontypecode = 1;
    switch( sessiontype ) {
        case "1": sessiontypestring = "Hourly"; sessiontypecode=1; sessiontypecharcode="hourly"; break;
        case "2": sessiontypestring = "Day Pass"; sessiontypecode=2; sessiontypecharcode="daily"; break;
        case "15": sessiontypestring = "Overnight"; sessiontypecode=15; sessiontypecharcode="overnight"; break;
        case "3": sessiontypestring = "Weekly"; sessiontypecode=3; sessiontypecharcode="weekly"; break;
        case "4": sessiontypestring = "Monthly"; sessiontypecode=4; sessiontypecharcode="monthly"; break;
        case "2000": sessiontypestring = "Meeting Room"; sessiontypecode=2000; sessiontypecharcode="meetingroom"; break;
    }

    var href_sessiontypecharcode = "/sessiontypes/" + sessiontypecharcode;

    //document.querySelector("span.session-type").innerHTML = sessiontypestring;

    //console.log(prodcardno);
    //console.log(customername);

    var wpc_ip_address = "159.65.1.49";
    //TODO - get wpc_ip_address setting from the settings page
    //var wpc_ip_address = getIPAddress();
    useEffect(() => {
        // Perform localStorage action
        const wpc_ip_address = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
      }, [wpc_ip_address])

    //var wpc_ip_address = "159.65.1.49";
    var validate_url = "http://" + wpc_ip_address + "/workplace/app/check-registration";

    console.log(validate_url);

    var prodcardoptionstring = "";
    if ( typeof prodcardno !== 'undefined' && prodcardno ) {
        if (prodcardno.length >= 3) {
            prodcardoptionstring = " | [ Card No: " + prodcardno.padStart(10,"0") + "]";
            axios
                .post(validate_url, {
                    prod_card_no: prodcardno
                })
                .then(response => {
                    if (response.status == "200") {
                        const customer = response.data;
                        if (customer.customername) {
                            document.querySelector("span.customer-name").innerHTML = customer.customername;
                            
                            document.querySelector("input.customer-name").value = customer.customername;
                            document.querySelector("input.customer-prod-card-no").value = prodcardno;
                        } else {
                            document.querySelector("span.customer-name").innerHTML = "Friend";

                            document.querySelector("input.customer-name").value = "";
                            document.querySelector("input.customer-prod-card-no").value = "";
                        }
                    } else {
                        document.querySelector("input.customer-name").value = "";
                        document.querySelector("input.customer-prod-card-no").value = "";
                    }

                });
        
        } else {
            document.querySelector("input.customer-name").value = "";
            document.querySelector("input.customer-prod-card-no").value = "";
        }
    }

    if ( typeof customername !== 'undefined' && customername ) {
        document.querySelector("span.customer-name").innerHTML = customername;
        document.querySelector("input.customer-name").value = customername;
    }

    if ( typeof sessiontype !== 'undefined' && sessiontype ) {
        document.querySelector("input.session-type").value = sessiontype;
        document.querySelector("input.session-type-char-code").value = sessiontypecharcode;
    }

    return (
    <div class="comp-drinks-page">
        <Head>
            <title>Workplace Cafe Reception - Choose Your Complementary Drink</title>
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
            <div class="breadcrumb selected-session-type session-types-link">
                <span>
                    <i class="fa fa-chevron-right stay-options-link-icon"></i>
                </span>
                <Link class="session-type-char-code" href={href_sessiontypecharcode}>Personal Info</Link>
            </div>
            <div class="breadcrumb selected-session-type select-comp-drink-page current">
                <span>
                    <i class="fa fa-chevron-right stay-options-link-icon"></i>
                </span>
                <Link href="/compdrinks">Drink Selection</Link>
            </div>
        </div>


        <div class="welcome-message">
            Hello, <span class="customer-name"></span>! | [Option: <span class="session-type">{sessiontypestring}</span>] {prodcardoptionstring}
            <div class="select-drink-message">Please choose your drink.</div>
        </div>

        <div class="drink-selection-container row">
            <div class="drink-selection-block-container col-md-4">
                <div class="drink-selection-block" onClick={selectDrinkBlock}>
                    <i class="fa fa-solid fa-mug-hot drink-type-block-icon"></i>
                    <div class="drink-selection brewed-coffee">Brewed Coffee</div>
                    <div class="drink-selection-price">FREE</div>
                </div>
            </div>
            <div class="drink-selection-block-container col-md-4">
                <div class="drink-selection-block" onClick={selectDrinkBlock}>
                    <i class="fa fa-solid fa-glass-water drink-type-block-icon"></i>
                    <div class="drink-selection iced-tea">Iced Tea</div>
                    <div class="drink-selection-price">FREE</div>
                </div>
            </div>
            <div class="drink-selection-block-container col-md-4">
                <div class="drink-selection-block" onClick={selectDrinkBlock}>
                    <i class="fa fa-solid fa-beer-mug-empty drink-type-block-icon"></i>
                    <div class="drink-selection others">Others</div>
                    <div class="drink-selection-price">Check out our menu and inform our barista of your choice of beverage.</div>
                </div>
            </div>
        </div>

        <form name="drink-selection-form" class="drink-selection-form">
            <input type="hidden" name="selected-drink" class="selected-drink"/>
            <input type="hidden" name="customer-name" class="customer-name"/>
            <input type="hidden" name="customer-email" class="customer-email"/>
            <input type="hidden" name="customer-prod-card-no" class="customer-prod-card-no"/>
            <input type="hidden" name="session-type" class="session-type"/>
            <input type="hidden" name="session-type-char-code" class="session-type-char-code"/>
        </form>

        <div class="row back-next-row">
            <div class="col col-md-8">&nbsp;</div>
                <div class="col col-md-4">
                    <div class="row">
                        <div class="col col-md-6">
                            <Link href={href_sessiontypecharcode}>
                                <div class="btn-text btn-back">Back</div>
                            </Link>
                        </div>
                        <div class="col col-md-6">
                            <Link href="#">
                                <div class="btn-text btn-next" onClick={gotoSubmitPage}>Next</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )

}

export default CompDrinks;