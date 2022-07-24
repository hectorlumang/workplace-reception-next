import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import axios from 'axios';

function CompDrinkPage() {
    const router = useRouter();
    const {sessiontype} = router.query

    return(
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
                    <Link href="/sessiontypes/selectedsessiontype">Personal Info</Link>
                </div>
                <div class="breadcrumb selected-session-type select-comp-drink-page current">
                    <span>
                        <i class="fa fa-chevron-right stay-options-link-icon"></i>
                    </span>
                    <Link href="/compdrinks">Complimentary Drinks</Link>
                </div>
            </div>

        </div>
    )
}

export default CompDrinkPage;