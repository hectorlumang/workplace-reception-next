import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import axios from 'axios'

import { useEffect } from "react"

function ConfirmationPage() {
    //display confirmation message
    return(
        <div class="confirmation-page">
            <Head>
                <title>Workplace Cafe Reception - Personal Info</title>
                <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
                <meta name="description" content="Workplace Cafe Reception Application" />
                <link rel="icon" href="/workplace-cafe-logo.ico" />
            </Head>

            <div class="main-confirmation-block">
                <i class="fa-regular fa-circle-check confirmation-icon"></i>
                <div class="confirmation-title">You're All Set!</div>
                <div class="confirmation-message">Kindly get your <b>customer number</b> and <b>internet voucher code</b>.</div>
                <div class="confirmation-message-2">Wishing you a productive stay!</div>
            </div>
            
            <div class="row back-next-row restart-row">
                <div class="col col-md-12">
                    <Link href="/">
                        <div class="btn-text btn-next restart-btn">Start</div>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationPage