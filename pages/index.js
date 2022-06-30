import { Button, Flex, FormControl, Select, Link, Text, Textarea, Stack, useClipboard, Input, Image, Divider, ExternalLinkIcon } from '@chakra-ui/react'
import { motion, AnimatePresence } from "framer-motion"
import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
const axios = require('axios')
import Swal from 'sweetalert2'
import { format, add } from 'date-fns'

export default function Home() {

  const baseCurrentPrice = 27
  const [hasMounted, setHasMounted] = useState(false)
  const [isTimeframeSelected, setIsTimeframeSelected] = useState(false)
  const [methodSelected, setMethodSelected] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [receiverWallet, setReceiverWallet] = useState('')
  const [senderWallet, setSenderWallet] = useState('')
  const [userMail, setUserMail] = useState('')
  const [usedCoin, setUsedCoin] = useState('')
  const [usedChain, setUsedChain] = useState('')
  const [requiredCoin, setRequiredCoin] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const { hasCopied, onCopy } = useClipboard(receiverWallet)
  const { hasCopiedPrice, onCopyPrice } = useClipboard(requiredCoin)

  const handleSenderWalletChange = (e) => {
    setSenderWallet(e.target.value);
  };

  const handleUserMailChange = (e) => {
    setUserMail(e.target.value);
  }

  const handleTimeframeChange = useCallback((e) => {

    if (Number(e) == 1) {
      if (document.getElementById("timeframe1")) document.getElementById("timeframe1").style.backgroundColor = "#FFFF00";
      if (document.getElementById("timeframe1")) document.getElementById("timeframe1").style.color = "#292929";
      if (document.getElementById("timeframe2")) document.getElementById("timeframe2").style.backgroundColor = "var(--chakra-colors-whiteAlpha-200)";
      if (document.getElementById("timeframe2")) document.getElementById("timeframe2").style.color = "inherit";
    } else {
      if (document.getElementById("timeframe2")) document.getElementById("timeframe2").style.backgroundColor = "#FFFF00";
      if (document.getElementById("timeframe2")) document.getElementById("timeframe2").style.color = "#292929";
      if (document.getElementById("timeframe1")) document.getElementById("timeframe1").style.backgroundColor = "var(--chakra-colors-whiteAlpha-200)";
      if (document.getElementById("timeframe1")) document.getElementById("timeframe1").style.color = "inherit";
    }
    setIsSubmitting(true)
    setSelectedTimeframe(Number(e))
    const newMul = (Number(e)) == 1 ? 1 : 10
    const newPrice = baseCurrentPrice * newMul
    setCurrentPrice(parseFloat(newPrice))
    setIsSubmitting(false)
  }, [])

  const handlePaymentMethodChange = useCallback((e) => {

    if (Number(e) == 1) {
      if (document.getElementById("paymentMethod1")) document.getElementById("paymentMethod1").style.backgroundColor = "#FFFF00";
      if (document.getElementById("paymentMethod1")) document.getElementById("paymentMethod1").style.color = "#292929";
      if (document.getElementById("paymentMethod2")) document.getElementById("paymentMethod2").style.backgroundColor = "var(--chakra-colors-whiteAlpha-200)";
      if (document.getElementById("paymentMethod2")) document.getElementById("paymentMethod2").style.color = "inherit";
    } else {
      if (document.getElementById("paymentMethod2")) document.getElementById("paymentMethod2").style.backgroundColor = "#FFFF00";
      if (document.getElementById("paymentMethod2")) document.getElementById("paymentMethod2").style.color = "#292929";
      if (document.getElementById("paymentMethod1")) document.getElementById("paymentMethod1").style.backgroundColor = "var(--chakra-colors-whiteAlpha-200)";
      if (document.getElementById("paymentMethod1")) document.getElementById("paymentMethod1").style.color = "inherit";
    }
    setIsSubmitting(true)
    setMethodSelected(Number(e))
    setIsSubmitting(false)
  }, [])

  const goBackToTimeframe = () => {
    setIsTimeframeSelected(false)
  }

  const goBackChooseMethod = () => {
    setMethodSelected(0)
  }

  const askConfirmation = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "After you submit this information you will have 3 hours to complete the payment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Let's go Kyodai! 🔥`
    }).then((result) => {
      if (result.isConfirmed) {

        setIsSubmitting(true);
        sendPaymentToDb();
      }
    })
  };

  const sendPaymentToDb = async () => {

    if (usedChain == "" || usedChain == "" || senderWallet == "" || receiverWallet == "" || userMail == "") {
      Swal.fire(
        'Check your data!',
        'Fill every single field before proceed.',
        'warning'
      ).then((result) => {
        setIsSubmitting(false)
      })
      return
    }

    const res = await fetch("/api/payments", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body:
        JSON.stringify({
          "status": "pending",
          "chain": usedChain,
          "coin": usedCoin,
          "toPayUSD": parseFloat(currentPrice),
          "toPayCrypto": parseFloat(requiredCoin),
          "fromWallet": senderWallet,
          "toWallet": receiverWallet,
          "dateStart": format(new Date(), 'yyyy-MM-dd'),
          "dateEnd": add(new Date(), { months: 1 }),
          "plan": "base",
          "mail": userMail
        })
    })

    if (res.ok) {
      Swal.fire(
        'Data submitted!',
        'Go to complete your payment.',
        'success'
      ).then((result) => {
        setIsSubmitting(false)
        window.location.reload()
      })
    } else {
      Swal.fire(
        'Error during submit!',
        'Go to discord and open a ticket please.',
        'error'
      ).then((result) => {
        setIsSubmitting(false)
      })
    }

  }

  const targetCoinChange = useCallback(async (e) => {
    let targetValue = e.target.value;

    switch (targetValue) {

      case "TEST-ETH":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("ETH");
        setUsedChain("TEST");
        targetValue = "ETH"
        break;
      case "TEST-BUSD":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("BUSD");
        setUsedChain("TEST");
        targetValue = "BUSD"
        break;
      case "TEST-SOL":
        setReceiverWallet("BPJpUC4cxYfx8gmkfdX3BuWS1SYQW6Dg6ck9NaFhngzT");
        setUsedCoin("SOL");
        setUsedChain("TEST");
        targetValue = "SOL"
        break;

      case "USDT-BSC":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("USDT");
        setUsedChain("BSC");
        break;
      case "USDT-ETH":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("USDT");
        setUsedChain("ETHEREUM");
        break;
      case "BUSD-BSC":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("BUSD");
        setUsedChain("BSC");
        targetValue = "BUSD"
        break;
      case "BUSD-ETH":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("BUSD");
        setUsedChain("ETHEREUM");
        targetValue = "BUSD"
        break;
      case "USDC":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("USDC");
        setUsedChain("ETHEREUM");
        break;
      case "ETH":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("ETH");
        setUsedChain("ETHEREUM");
        break;
      case "BNB":
        setReceiverWallet("0x455a89CEaf1dfB149C9Fc166b84E694555b63766");
        setUsedCoin("BNB");
        setUsedChain("BSC");
        break;
      case "SOL":
        setReceiverWallet("BPJpUC4cxYfx8gmkfdX3BuWS1SYQW6Dg6ck9NaFhngzT");
        setUsedCoin("SOL");
        setUsedChain("SOLANA");
        break;
    }

    if (targetValue == "USDT" || targetValue == "USDC" || targetValue == "BUSD") {
      setRequiredCoin(currentPrice + " " + targetValue)
    } else {
      let url = "https://api.binance.com/api/v3/avgPrice?symbol=" + targetValue + "USDT"
      axios.get(url).then(response => {
        const body = response.data
        const coinPrice = body.price
        const required = (currentPrice / Number(coinPrice)).toFixed(4)
        setRequiredCoin(required + " " + targetValue)
      })
    }
  }, [currentPrice])

  const goPaymentDatails = useCallback(() => {
    window.scrollTo(0, 0);
    setUsedCoin("ETH")
    setUsedChain("ETHEREUM")
    setIsTimeframeSelected(true)
    targetCoinChange({ target: { value: "ETH" } })
  }, [targetCoinChange])

  const goFiatPaymentDatails = () => {
    window.scrollTo(0, 0);
    let url = selectedTimeframe == 1 ? "https://hpr.co/EoRIjkW4OPVsMFv3v0YXj" : "https://hpr.co/m38ikmfLRaBsL93s0G153";
    window.open(url, '_blank').focus();
  }

  const valuesRefresh = useCallback(() => {
    setIsLoaded(true)
    targetCoinChange({ target: { value: usedCoin } })
  }, [targetCoinChange, usedCoin])

  useEffect(() => {
    setHasMounted(true);
    handleTimeframeChange(2);
  }, [handleTimeframeChange]);
  if (!hasMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      <Flex
        direction="column"
        alignItems="center"
        width="100vw"
        minHeight="100vh"
        bgGradient="linear(to-br, white.200, black.100)">

        <Head>
          <title>ODA Clan 🥋 Samurai Gate</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="fit-content"
          mt={10}>
          <Flex mt={2} id="odaLogo" width="100%" textAlign="center">
            <Image margin={"auto"} width="90%" maxWidth="600px" src='https://i.imgur.com/P1z3KM3.png' alt="" />
          </Flex>
          <Text lineHeight="35px" textAlign="center" fontSize="2xl" fontWeight="800" color="white" mt={12}>
            <span style={{ color: "#FFFF00" }}>SAMURAI </span> GATE
          </Text>
        </Flex>

        <>
          {(methodSelected == 0) ?
            <>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -200 }}>
                <FormControl isRequired width="95vw" maxWidth="350px" colorScheme="red" mt={4}>
                  <Text fontSize="xl" textAlign={"center"}>
                    You will be <span style={{ color: "#FFFF00" }}>tomorrow</span> what you <span style={{ color: "#FFFF00" }}>choose
                    </span> to be <span style={{ color: "#FFFF00" }}>today</span> 🥋 
                    <br />
                    <br />
                    Choose your payment method
                  </Text>
                  <Flex mb={2} mt={6}>
                    <Button id="paymentMethod1" value="1" size='xs' width="200px" height="100px" mr={2} fontSize="1.5em"
                      onClick={(e) => { handlePaymentMethodChange(1) }}>
                      <Text>
                        CRYPTO
                      </Text>
                    </Button>
                    <Button id="paymentMethod2" value="2" size='xs' width="200px" height="100px" ml={2} fontSize="1.5em"
                      onClick={(e) => { handlePaymentMethodChange(2) }}>
                      <Text>
                        FIAT
                      </Text>
                    </Button>
                  </Flex>
                  <Flex mt={25}>
                    <Image src='https://i.imgur.com/Q8SR9Lc.png' alt="" />
                  </Flex>
                </FormControl>
              </motion.div>
            </>
            :
            <>
            </>
          }
        </>

        {!isSubmitting ?
          (methodSelected == 1 || methodSelected == 2) ?
            methodSelected == 1 ?
              <>
                {!isTimeframeSelected ?
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 200 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -200 }}>
                      <FormControl style={{ transition: "4s" }} isRequired width="95vw" maxWidth="350px" colorScheme="red" mt={4}>
                        <Flex mb={2} mt={6}>
                          <Button id="paymentMethod1" size='xs' width="60px" height="35px" mr={2} fontSize="1.5em"
                            onClick={() => { goBackChooseMethod() }}>
                            <Text>
                              ⬅️
                            </Text>
                          </Button>
                          <Button size='xs' width="100%" height="35px" ml={2} fontSize="1.5em"
                            style={{ pointerEvents: "none" /*, backgroundColor: "#FFFF00", color: "#292929"*/ }}>
                            <Text>
                              {methodSelected == 1 ? "CRYPTO" : "FIAT"}
                            </Text>
                          </Button>
                        </Flex>

                        <Flex mb={2} mt={6}>
                          <Button id="timeframe2" value="2" size='xs' width="200px" height="100px" mr={2} fontSize="1.5em"
                            style={{ color: "#292929", backgroundColor: "#FFFF00" }}
                            onClick={(e) => { handleTimeframeChange(2) }}>
                            <Text>
                              YEARLY
                              <p className='priceFont'>97 USD</p>
                            </Text>
                          </Button>
                          <Button id="timeframe1" value="1" size='xs' width="200px" height="100px" ml={2} fontSize="1.5em"
                            onClick={(e) => { handleTimeframeChange(1) }}>
                            <Text>
                              MONTHLY
                              <p className='priceFont'>17 USD</p>
                            </Text>
                          </Button>
                        </Flex>

                        <Textarea rows={1} resize={"none"} isDisabled={selectedTimeframe == 1} value={(selectedTimeframe == 1 ? "❌" : "✅") + " 3 guaranteed whitelist"} isReadOnly mb={3} mt={4} />
                        <Textarea rows={1} resize={"none"} isDisabled={selectedTimeframe == 1} value={(selectedTimeframe == 1 ? "❌" : "✅") + " 50%+ discount"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive, premium NFTs projects and Crypto analysis"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive, periodic giveaways from the best projects"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive info regarding new events (whitelists, strategies, flash events, etc...)"} isReadOnly mb={3} />
                        <Textarea rows={1} resize={"none"} value={"✅ Private chatroom"} isReadOnly mb={3} />
                        <Textarea rows={1} resize={"none"} value={"✅ Personal profile picture"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Access to the incoming ODA Clan NFTs collection’s whitelist"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive 10 rules guide to invest efficiently in the Crypto and NFTs world"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive access to bots and software currently in development"} isReadOnly mb={3} />
                        <Textarea rows={"auto"} resize={"none"} value={"✅ Priority 360° support (1to1 by custom ticket)"} isReadOnly mb={3} />

                        <Flex mb={2} mt={6}>

                          <Button value="2" width="400px" height="50px" mb={35}
                            onClick={() => goPaymentDatails()}>
                            NEXT 🥋
                          </Button>

                        </Flex>
                      </FormControl>
                    </motion.div>
                  </>
                  :
                  <>
                    <Flex
                      id="cryptoZone"
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100vw"
                      height="fit-content"
                      mt="60px">

                      <FormControl isRequired width="95vw" maxWidth="350px" colorScheme="red">
                        {!isLoaded ? valuesRefresh() : ""}
                        <Flex mb={2}>
                          <Text fontWeight="700" color="orange">If you need to use a chain/coin not listed, please contact support via
                            <><a
                              style={{ marginLeft: "3px", textDecoration: "underline", color: "orange" }}
                              href="https://discord.gg/odaclan">ticket
                            </a></>
                          </Text>
                        </Flex>
                        <Stack spacing={3} mt={4}>
                          <Text fontWeight="700">Wich crypto you want to use?</Text>
                          <Select onChange={(e) => targetCoinChange(e)}>
                            <option value="TEST-ETH">TEST ETH</option>
                            <option value="TEST-BUSD">TEST BUSD</option>
                            <option value="TEST-SOL">TEST SOL</option>
                            <Divider />
                            <option value="ETH">ETH  | Ethereum</option>
                            <option value="USDC">USDC | Ethereum</option>
                            <option value="USDT-ETH">USDT | Ethereum</option>
                            <option value="BUSD-ETH">BUSD | Ethereum</option>
                            <Divider />
                            <option value="BNB">BNB  | Binance Smart Chain</option>
                            <option value="USDT-BSC">USDT | Binance Smart Chain</option>
                            <option value="BUSD-BSC">BUSD | Binance Smart Chain</option>
                            <Divider />
                            <option value="SOL">SOL  | Solana</option>
                          </Select>
                          <Flex mb={2}>
                            <Text fontWeight="700">Send to wallet:</Text>
                          </Flex>
                          <Flex mb={2}>
                            <Input value={receiverWallet} isReadOnly />
                            <Button onClick={onCopy} ml={2}>
                              {hasCopied ? 'Copied' : 'Copy'}
                            </Button>
                          </Flex>

                          <Flex mb={2}>
                            <Text fontWeight="700">Wich wallet do you use to send the payment?</Text>
                          </Flex>
                          <Flex mb={2}>
                            <Input value={senderWallet} onChange={handleSenderWalletChange} />
                          </Flex>

                          <Flex mb={2}>
                            <Text fontWeight="700">Your email address used to receive the Licence code</Text>
                          </Flex>
                          <Flex mb={2}>
                            <Input value={userMail} onChange={handleUserMailChange} />
                          </Flex>

                          <Flex mb={2}>
                            <Text fontWeight="700" width="45%">Price</Text>
                            <Text fontWeight="700">Coin Price</Text>
                          </Flex>
                          <Flex mb={2}>
                            <Input value={currentPrice + " USD"} isReadOnly />
                            <Input value={requiredCoin} isReadOnly ml={2} />
                            <Button onClick={onCopyPrice} ml={2}>
                              {hasCopiedPrice ? 'Copied' : 'Copy'}
                            </Button>
                          </Flex>

                          <Flex mb={2} style={{ marginTop: "10%" }}>
                            <Text fontWeight="700" color="orange">Review your data and click next button</Text>
                          </Flex>
                          <Flex mb={35}>
                            <Button width="95vw" onClick={goBackToTimeframe} mr={2}>BACK</Button>
                            <Button width="95vw" onClick={askConfirmation} ml={2}>NEXT 🥋</Button>
                          </Flex>
                        </Stack>
                      </FormControl>

                    </Flex>
                  </>
                }
              </>
              :
              <>
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -200 }}>
                  <FormControl isRequired width="95vw" maxWidth="350px" colorScheme="red" mt={2}>
                    <Flex mb={2} mt={6}>
                      <Button id="paymentMethod1" size='xs' width="60px" height="35px" mr={2} fontSize="1.5em"
                        onClick={() => { goBackChooseMethod() }}>
                        <Text>
                          ⬅️
                        </Text>
                      </Button>
                      <Button size='xs' width="100%" height="35px" ml={2} fontSize="1.5em"
                        style={{ pointerEvents: "none" /*, backgroundColor: "#FFFF00", color: "#292929"*/ }}>
                        <Text>
                          {methodSelected == 1 ? "CRYPTO" : "FIAT"}
                        </Text>
                      </Button>
                    </Flex>

                    <Flex mb={2} mt={6}>
                      <Button id="timeframe2" value="2" size='xs' width="200px" height="100px" mr={2} fontSize="1.5em"
                        style={{ color: "#292929", backgroundColor: "#FFFF00" }}
                        onClick={(e) => { handleTimeframeChange(2) }}>
                        <Text>
                          YEARLY
                          <p className='priceFont'>97 USD</p>
                        </Text>
                      </Button>
                      <Button id="timeframe1" value="1" size='xs' width="200px" height="100px" ml={2} fontSize="1.5em"
                        onClick={(e) => { handleTimeframeChange(1) }}>
                        <Text>
                          MONTHLY
                          <p className='priceFont'>17 USD</p>
                        </Text>
                      </Button>
                    </Flex>

                    <Textarea rows={1} resize={"none"} isDisabled={selectedTimeframe == 1} value={(selectedTimeframe == 1 ? "❌" : "✅") + " 3 guaranteed whitelist"} isReadOnly mb={3} mt={4} />
                    <Textarea rows={1} resize={"none"} isDisabled={selectedTimeframe == 1} value={(selectedTimeframe == 1 ? "❌" : "✅") + " 50%+ discount"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive, premium NFTs projects and Crypto analysis"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive, periodic giveaways from the best projects"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive info regarding new events (whitelists, strategies, flash events, etc...)"} isReadOnly mb={3} />
                    <Textarea rows={1} resize={"none"} value={"✅ Private chatroom"} isReadOnly mb={3} />
                    <Textarea rows={1} resize={"none"} value={"✅ Personal profile picture"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Access to the incoming ODA Clan NFTs collection’s whitelist"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive 10 rules guide to invest efficiently in the Crypto and NFTs world"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Exclusive access to bots and software currently in development"} isReadOnly mb={3} />
                    <Textarea rows={"auto"} resize={"none"} value={"✅ Priority 360° support (1to1 by custom ticket)"} isReadOnly mb={3} />

                    <Flex mb={2} mt={6}>

                      <Button value="2" width="400px" height="50px" mb={35}
                        onClick={() => goFiatPaymentDatails()}>
                        NEXT 🥋
                      </Button>

                    </Flex>
                  </FormControl>
                </motion.div>
              </>
            :
            <>
            </>
          :
          <>
            <Flex mt={10} id="odaSpinner">
              <Image src='https://cdn.discordapp.com/emojis/987277668770803722.webp?size=240&quality=lossless' alt="" />
            </Flex>
          </>
        }

      </Flex >
    </AnimatePresence>
  )
}
