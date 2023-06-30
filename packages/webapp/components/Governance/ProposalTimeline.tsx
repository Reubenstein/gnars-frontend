import {
  Box,
  HStack,
  Square,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react"
import { AvatarWallet } from "components/AvatarWallet"
import { FC } from "react"
import { DetailedProposalData, Support } from "utils/governanceUtils"
import { EventTime } from "./EventTime"

export interface ProposalTimelineProps extends StackProps {
  proposal: DetailedProposalData
}

export const ProposalTimeline: FC<ProposalTimelineProps> = ({
  proposal,
  ...props
}) => {
  return (
    <VStack
      // bgColor={"black"}
      w={"full"}
      divider={<StackDivider borderColor={"chakra-border-color"} />}
      p={2}
      borderWidth={1}
      borderRadius={"md"}
      overflowY={"scroll"}
      {...props}
    >
      {proposal?.events?.map((event) => (
        <VStack w="full" align={"start"} key={event.id}>
          <HStack w={"full"} align={"start"} justify={"space-between"}>
            <AvatarWallet
              address={event.from}
              fontSize={"sm"}
              fontWeight={"semibold"}
            />
            <VStack spacing={0} align={"end"}>
              <HStack fontWeight={"bold"} fontSize={"xs"}>
                {event?.vote ? (
                  <HStack spacing={1} wrap={"wrap"} justify={"end"}>
                    <Text color={"gray.600"}>VOTED</Text>
                    <Text
                      whiteSpace={"nowrap"}
                      color={`governance.vote.${Support[
                        event.vote.supportDetailed
                      ].toLowerCase()}`}
                    >
                      {` ${event.vote.votes} ${Support[
                        event.vote.supportDetailed
                      ].toUpperCase()}`}
                    </Text>
                  </HStack>
                ) : (
                  <Text
                    textAlign={"end"}
                    color={`governance.proposal.event.${event.kind.toLowerCase()}`}
                  >
                    {event.kind} PROP
                  </Text>
                )}
              </HStack>
              <EventTime timestamp={event.blockTimestamp} />
            </VStack>
          </HStack>
          {event.vote?.reason && (
            <Box
              w="full"
              position={"relative"}
              bg={"gray.800"}
              borderWidth={1}
              p={4}
              borderRadius={"md"}
              overflow={"visible"}
            >
              <Square
                bg={"gray.800"}
                position={"absolute"}
                borderWidth={1}
                borderColor={"whiteAlpha.300"}
                transform={"rotate(-45deg)"}
                clipPath={"polygon(0 0, 100% 0, 100% 100%)"}
                size={3}
                top={"-6px"}
                left={"11px"}
              />
              <Text>{event.vote.reason}</Text>
            </Box>
          )}
        </VStack>
      ))}
    </VStack>
  )
}