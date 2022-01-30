import { Box, Spacer, Flex, Text } from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify  from "millify";
import {baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos }}) => (
    <Box maxWidth="1000px" margin="auto" p="4">
        {
            photos && <ImageScrollBar data={photos}/>
        }
        <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="green.400">{isVerified && <GoVerified/>}</Box>
                    <Text fontWeight="bold" fontSize="lg">
                        AED {millify(price)}{rentFrequency && `/${rentFrequency}`}
                    </Text>
                    <Spacer />
                </Flex>
                <Box>
                    <Avatar size="sm" src={agency?.logo?.url}/>
                </Box>
            </Flex>
            <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box fontSize="lg" marginBottom="2" fontWeight="bold">
                <Text fontSize="lg">
                    {title}  
                </Text>
                <Text lineHeight="2" marginTop="4" color="gray.400">
                    {description}
                </Text>
            </Box>
            <Flex flexWrap="wrap">
                 
            </Flex>
        </Box>
    </Box>
)

export async function getServerSideProps({params: { id }}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return {
        props: {
            propertyDetails: data
        }
    }
}

export default PropertyDetails;