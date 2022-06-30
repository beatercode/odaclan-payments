import React, { Component, Fragment } from "react";
import { Flex, Text } from '@chakra-ui/react'

class Footer extends Component {
    render() {
        return (
            //<div style={{ position: "absolute", bottom: 0, width: "100%" }} className="bg-gray-100">
            <Flex
                textAlign="center"
                width="100vw"
                position="absolute">
                <Text
                    fontWeight="700"
                    width="100vw"
                    textAlign="center"
                    mb={5}
                    mt={5}>
                    © ODA Clan DAO. All rights reserved
                </Text>
            </Flex>

        );
    }
}

export default Footer;