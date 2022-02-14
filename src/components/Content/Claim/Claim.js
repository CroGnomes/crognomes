import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import LoadingButton from '@mui/lab/LoadingButton'

import ABIs from '../../../config/abis.json'

const TextTitle = styled.div`
    color: #FDDA33;
    font-size: 60px;
    text-shadow: 4px 0 0 #000, -4px 0 0 #000, 0 4px 0 #000, 0 -4px 0 #000, 2px 2px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
`

const Wrapper = styled(Box)`
    text-align: center;
    width: 525px;
    height: 500px;
    font-family: Chewy !important;
    text-transform: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 100px;
`

const MBox = styled(Box)`
    .Mui-disabled {
        background-color: rgba(253,218,51,0.8) !important;
    }

    .MuiCircularProgress-colorInherit {
        color: green !important;
    }

    .MuiLoadingButton-loadingIndicator {
        left: 68%;
    }
`

const MButton = styled(Button)`
    background-color: rgba(196,196,196,0.7) !important;
    border-radius: 17px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 400px;
    width: 90%;
    height: 87px;
`

const SButton = styled(LoadingButton)`
    background-color: #FDDA33 !important;
    border-radius: 10px !important;
    font-family: Chewy !important;
    font-size: 20px !important;
    line-height: 26px !important;
    text-shadow: 0px 3px rgba(0,0,0,0.4);
    color: white !important;
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 300px;
    width: 90%;
    height: 57px;
`

const Claim = ({ account, web3, rightChain, utilContract, setAlert, setNotice }) => {
    const [ctokAmount, setCtokAmount] = useState(0)
    const [loading, setLoading] = useState(false)

    const getTotalClaimable = async () => {
        const contract = new web3.eth.Contract(ABIs[0].abi, ABIs[0].address)
        const method = await contract.methods.getTotalClaimable(account).call().catch(e => {
            setLoading(false)
        })
        setCtokAmount((parseInt(method.toString(10)) / (10 ** 18)).toFixed(2))
        setLoading(false)
    }

    const getReward = async () => {
        setLoading(true)
        try {
            await utilContract.methods.getReward(account).send({
                from: account
            })
            setNotice(["success", "You have claimed your reward"])
            setAlert(true)
            getTotalClaimable()
        } catch (e) {
            setNotice(["error", "Sorry, error occured during the transaction"])
            setAlert(true)
            setLoading(false)
        }
    }

    const migrate = async () => {
        setLoading(true)
        try {
            const contract = new web3.eth.Contract(ABIs[1].abi, ABIs[1].address)
            await contract.methods.migrateFromOldCrognome().send({
                from: account
            })
            setNotice(["success", "You have migrated your old crognomes"])
            setAlert(true)
            setLoading(false)
        } catch (e) {
            setNotice(["error", "Sorry, error occured during the transaction"])
            setAlert(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (account !== undefined && rightChain === true) {
            getTotalClaimable()
        }
    }, [account, rightChain,])

    return (
        <Wrapper>
            <TextTitle>Claim Your CCL Tokens</TextTitle>
            <MButton
                onClick={getTotalClaimable}
                disabled={!rightChain}>
                {ctokAmount} CLAIMABLE TOKENS</MButton>
            <MBox>
                <SButton loading={loading}
                    onClick={getReward}
                    disabled={!rightChain}
                >CLAIM</SButton>
                <SButton loading={loading}
                    onClick={migrate}
                    style={{ marginTop: 20 }}
                    disabled={!rightChain}
                >
                    MIGRATE
                </SButton>
            </MBox>
        </Wrapper>
    )
}

export default Claim