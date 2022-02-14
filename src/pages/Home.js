import React, { useState } from 'react'
import styled from 'styled-components'

import Header from '../components/Header/Header'
import Content from '../components/Content/Content'
import Footer from '../components/Footer/Footer'
import CustomizedSnackbars from '../components/Alert/Alert'

const Wrapper = styled.div`
    background-image: url('images/forest.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: Chewy;
    width: 100%;

`

const Shadow = styled.div`
    background-color: rgba(51,51,51,0.58);
    padding-bottom: 100px;
`

const Home = () => {
    const [web3, setWeb3] = useState()
    const [rightChain, setRightChain] = useState(false)
    const [account, setAccount] = useState()
    const [alert, setAlert] = useState(false)
    const [notice, setNotice] = useState(["", ""])

    return (
        <div className='top' style={{ height: '100%' }}>
            <Wrapper>
                <Shadow>
                    <CustomizedSnackbars
                        open={alert}
                        setOpen={setAlert}
                        type={notice[0]}
                        message={notice[1]}
                    />
                    <Header
                        account={account}
                        setWeb3={setWeb3}
                        setAccount={setAccount}
                        setRightChain={setRightChain}
                        setAlert={setAlert}
                        setNotice={setNotice}
                    />
                    <Content
                        account={account}
                        web3={web3}
                        rightChain={rightChain}
                        setAlert={setAlert}
                        setNotice={setNotice}
                    />
                </Shadow>
            </Wrapper>
            <Footer />
        </div>
    )
}

export default Home