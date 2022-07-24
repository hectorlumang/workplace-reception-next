//import bootstrap from 'react-bootstrap'
import Link from 'next/link'
import Head from 'next/head'

function Sessiontypes() {
    return <div class="sessiontypes">
        <Head>
            <title>Workplace Cafe Reception - Choose Your Stay Option</title>
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
                <Link href="/sessiontypes">Stay Options</Link>
            </div>
        </div>


        <div class="sessiontypes-container">
            <div class="sessiontypes-what-type">
                What service would you like to avail?
            </div>

            <div class="row">
                <div class="col col-md-4">
                    <Link href="/sessiontypes/hourly">
                        <div class="session-type-block">
                            <i class="fa fa-regular fa-clock session-type-block-icon"></i>
                            <div class="session-type-name">
                                Hourly Stay
                            </div>
                            <div class="session-price hourly-stay">
                                <div class="session-price-1">P70 first hour</div>
                                <div class="session-price-2">*P50 succeeding hour</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="col col-md-4">
                    <Link href="/sessiontypes/daily">
                        <div class="session-type-block">
                            <i class="fa fa-regular fa-sun session-type-block-icon"></i>
                            <div class="session-type-name">
                                Day Pass
                            </div>
                            <div class="session-price">
                                <div class="session-price-1">P320 / day</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="col col-md-4">
                    <Link href="/sessiontypes/overnight">
                        <div class="session-type-block">
                            <i class="fa fa-regular fa-moon session-type-block-icon"></i>
                            <div class="session-type-name">
                                Overnight
                            </div>
                            <div class="session-price">
                                <div class="session-price-1">P270 overnight</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div class="row">
                <div class="col col-md-4">
                    <Link href="/sessiontypes/weekly">
                        <div class="session-type-block">
                            <span class="fa fa-stack session-type-block-icon">
                                <i class="fa-regular fa-calendar calendar-main-icon"></i>
                                <i class="fa-solid fa-7 calendar-7-icon"></i>
                            </span>
                            <div class="session-type-name">
                                Weekly
                            </div>
                            <div class="session-price">
                                <div class="session-price-1">P1,500 / week</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="col col-md-4">
                    <Link href="/sessiontypes/monthly">
                        <div class="session-type-block">
                            <i class="fa fa-regular fa-calendar session-type-block-icon"></i>
                            <div class="session-type-name">
                                Monthly
                            </div>
                            <div class="session-price">
                                <div class="session-price-1">P6,000 / month</div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div class="col col-md-4">
                    <Link href="/sessiontypes/meetingroom">
                        <div class="session-type-block">
                            <span class="fa fa-stack session-type-block-icon meeting-rm-icon">
                                <i class="fa fa-regular fa-user meeting-rm-user-1"></i>
                                <i class="fa fa-regular fa-user meeting-rm-user-2"></i>
                                <i class="fa fa-regular fa-user meeting-rm-user-3"></i>
                                <i class="fa fa-regular fa-clock meeting-rm-clock"></i>
                            </span>
                            <div class="session-type-name">
                                Meeting Room
                            </div>
                            <div class="session-price">
                                <div class="session-price-1">Prices Vary</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    </div>
  }
  
  export default Sessiontypes;