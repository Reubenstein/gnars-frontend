import { Heading, Text, VStack } from "@chakra-ui/react"
import { AvatarWallet } from "components/AvatarWallet"
import { Inter } from "next/font/google"
import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { TransactionData } from "utils/governanceUtils"
import styles from "./ProposalContent.module.css"
import { TransactionCard } from "./TransactionCard"
const inter = Inter({ subsets: ["latin"] })

export interface ProposalContentProps {
  transactions: TransactionData[]
  proposer: `0x${string}`
  description: string
}

export const ProposalContent: FC<ProposalContentProps> = ({
  transactions,
  proposer,
  description,
}) => {
  return (
    <>
      <VStack p={8} alignSelf={"start"} alignItems={"start"}>
        <Text fontWeight={"bold"}>Proposed by</Text>
        <AvatarWallet address={proposer} />
      </VStack>
      <VStack
        w={"full"}
        p={[4, 8]}
        alignItems={"start"}
        spacing={8}
        fontSize={["sm", "md", "lg"]}
      >
        <ReactMarkdown
          className={`${styles.markdown} ${inter.className}`}
          remarkPlugins={[remarkGfm]}
        >
          {description}
        </ReactMarkdown>
        <Heading
          as={"h2"}
          textStyle={"h2"}
          fontSize="1.5em"
          className={inter.className}
          fontFamily={inter.style.fontFamily}
          fontWeight={700}
        >
          Proposed Transactions
        </Heading>
        {transactions.map((transaction, i) => (
          <TransactionCard
            w={"full"}
            key={`proposal-tx-${i + 1}`}
            data={transaction}
            index={i + 1}
          />
        ))}
      </VStack>
    </>
  )
}

export default ProposalContent
