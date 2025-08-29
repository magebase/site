import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface ProposalPDFProps {
  quote_request: any;
  proposal_token: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#2563eb",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1f2937",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#374151",
  },
  table: {
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

export const ProposalPDF: React.FC<ProposalPDFProps> = ({ quote_request }) => {
  const phases = [
    {
      name: "Discovery & Planning",
      duration: "1-2 weeks",
      cost: Math.round(quote_request.estimated_cost * 0.15),
    },
    {
      name: "Design",
      duration: "2-3 weeks",
      cost: Math.round(quote_request.estimated_cost * 0.2),
    },
    {
      name: "Development",
      duration: "6-8 weeks",
      cost: Math.round(quote_request.estimated_cost * 0.5),
    },
    {
      name: "Testing & QA",
      duration: "2-3 weeks",
      cost: Math.round(quote_request.estimated_cost * 0.1),
    },
    {
      name: "Launch & Deployment",
      duration: "1-2 weeks",
      cost: Math.round(quote_request.estimated_cost * 0.05),
    },
  ];

  const totalCost = phases.reduce((sum, phase) => sum + phase.cost, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Project Proposal</Text>
          <Text style={styles.subheader}>{quote_request.project_name}</Text>

          <Text style={styles.text}>
            Client:{" "}
            {quote_request.client?.company_name ||
              quote_request.client?.contact_name}
          </Text>
          <Text style={styles.text}>
            Project Type: {quote_request.use_case}
          </Text>
          <Text style={styles.text}>
            Total Investment: ${totalCost.toLocaleString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Project Overview</Text>
          <Text style={styles.text}>{quote_request.project_description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Project Phases</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Phase</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Duration</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Cost</Text>
              </View>
            </View>
            {phases.map((phase, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{phase.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{phase.duration}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    ${phase.cost.toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>What's Included</Text>
          {quote_request.selected_features.map(
            (feature: any, index: number) => (
              <Text key={index} style={styles.text}>
                • {feature.name}
              </Text>
            )
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Terms & Conditions</Text>
          <Text style={styles.text}>• 50% deposit required to begin work</Text>
          <Text style={styles.text}>• Remaining 50% upon completion</Text>
          <Text style={styles.text}>
            • 30-day warranty on all work delivered
          </Text>
          <Text style={styles.text}>
            • Up to 3 rounds of revisions included
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ProposalPDF;
