import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import axios from 'axios'

import { useEffect } from "react"


function updateServerIPAddress() {
    var new_serveripaddress = document.querySelector("input.server-ip-address").value;
    if (confirm("Modify IP Address? [" + new_serveripaddress + "]") == true) {
        localStorage.setItem('serveripaddress', new_serveripaddress);

        alert("New address saved. [" + new_serveripaddress + "]");

        window.location.href = "/";
    } else {
        alert("IP Address not saved.");
        document.querySelector("input.server-ip-address").value = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
    }
}

function loadIPAddress() {
    console.log("loadIPAddress...");
    if (typeof window !== "undefined") {
        var serveripaddress = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';

        console.log("settings page: serveripaddress = ["+ serveripaddress +"]");

        document.querySelector("input.server-ip-address").value = serveripaddress;
    }
    return true;
}

function settingspage() {
    
    const router = useRouter()

    var ip_address = "159.65.1.4";
    //var wpc_ip_address = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
    //useEffect - to load localstorage on client side - to fix undefined errors
    useEffect(() => {
        // Perform localStorage action
        var ip_address = localStorage.getItem('serveripaddress') ? localStorage.getItem('serveripaddress') : '159.65.1.49';
        document.querySelector("div.settings-page form input.server-ip-address").value = ip_address;
      }, [ip_address])

    return (
        <div class="settings-page ln-51">
                <Head>
                    <title>Workplace Cafe Reception - Settings</title>
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
                    <div class="breadcrumb session-types-link current">
                        <span>
                            <i class="fa fa-chevron-right stay-options-link-icon"></i>
                        </span>
                        <Link href="/settings">Settings</Link>
                    </div>
                </div>

            <div class="settings-form">
                <form name="settings-form" class="settings-form" action="/" method="POST">
                    <label>Workplace Cafe Server IP Address</label>
                    <input type="text" class="form-control server-ip-address" name="server-ip-address" placeholder="Enter Workplace Cafe Server IP Address"/>
                    <div class="row settings-form-action-panel">
                        <div class="col col-md-12 save-button-col">
                            <button class="save-ip-address-btn" onClick={updateServerIPAddress}>SAVE</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );

}
export default settingspage;