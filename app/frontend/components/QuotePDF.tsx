import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottom: 3,
    borderBottomColor: "#1f2937", // gray-800
    paddingBottom: 20,
    backgroundColor: "#f8fafc", // slate-50
    padding: 20,
    borderRadius: 8,
  },
  logoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937", // gray-800
  },
  companyInfo: {
    fontSize: 10,
    color: "#6b7280", // gray-500
    textAlign: "right",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937", // gray-800
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280", // gray-500
    textAlign: "center",
    marginBottom: 10,
  },
  quoteNumber: {
    fontSize: 12,
    color: "#3b82f6", // blue-500
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#ffffff",
    border: 1,
    borderColor: "#e5e7eb", // gray-200
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1f2937", // gray-800
    borderBottom: 2,
    borderBottomColor: "#3b82f6", // blue-500
    paddingBottom: 5,
  },
  text: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.6,
    color: "#374151", // gray-700
  },
  bold: {
    fontWeight: "bold",
    color: "#1f2937", // gray-800
  },
  table: {
    marginTop: 15,
    marginBottom: 20,
    border: 1,
    borderColor: "#e5e7eb", // gray-200
    borderRadius: 6,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // gray-200
  },
  tableHeader: {
    backgroundColor: "#f3f4f6", // gray-100
    borderBottom: 2,
    borderBottomColor: "#d1d5db", // gray-300
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: 12,
    color: "#374151", // gray-700
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#1f2937", // gray-800
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
    color: "#1f2937", // gray-800
    backgroundColor: "#f3f4f6", // gray-100
    padding: 15,
    borderRadius: 6,
    border: 2,
    borderColor: "#3b82f6", // blue-500
  },
  pricingCard: {
    backgroundColor: "#f8fafc", // slate-50
    border: 1,
    borderColor: "#e2e8f0", // slate-200
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  pricingLabel: {
    fontSize: 12,
    color: "#6b7280", // gray-500
    marginBottom: 2,
  },
  pricingValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937", // gray-800
  },
  termsSection: {
    backgroundColor: "#f8fafc", // slate-50
    border: 1,
    borderColor: "#e2e8f0", // slate-200
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b", // slate-800
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 10,
    color: "#475569", // slate-600
    lineHeight: 1.4,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#6b7280", // gray-500
    borderTop: 1,
    borderTopColor: "#e5e7eb", // gray-200
    paddingTop: 15,
  },
  footerText: {
    marginBottom: 3,
  },
  footerLink: {
    color: "#3b82f6", // blue-500
    textDecoration: "none",
  },
});

interface QuoteRequest {
  id: number;
  project_name: string;
  project_description: string;
  use_case: string;
  estimated_cost: number;
  deposit_amount: number;
  monthly_retainer: number;
  selected_features: Array<{
    id: number;
    name: string;
    base_cost: number;
  }>;
  project_milestones: Array<{
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: string;
  }>;
  client?: {
    company_name: string;
    contact_name: string;
    email: string;
  };
  created_at: string;
}

interface QuotePDFProps {
  quoteRequest: QuoteRequest;
  companyName?: string;
  companyWebsite?: string;
  companyEmail?: string;
  companyPhone?: string;
}

const QuotePDF: React.FC<QuotePDFProps> = ({
  quoteRequest,
  companyName = "Magebase",
  companyWebsite = "www.magebase.dev",
  companyEmail = "hello@magebase.dev",
  companyPhone = "+1 (555) 123-4567",
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.logo}>{companyName}</Text>
            <View style={styles.companyInfo}>
              <Text>{companyWebsite}</Text>
              <Text>{companyEmail}</Text>
              <Text>{companyPhone}</Text>
            </View>
          </View>
          <Text style={styles.title}>Project Quote</Text>
          <Text style={styles.subtitle}>
            Professional Software Development Services
          </Text>
          <Text style={styles.quoteNumber}>Quote #{quoteRequest.id}</Text>
        </View>

        {/* Project Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Project Name: </Text>
            {quoteRequest.project_name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Use Case: </Text>
            {quoteRequest.use_case}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Description: </Text>
            {quoteRequest.project_description}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Quote Date: </Text>
            {formatDate(quoteRequest.created_at)}
          </Text>
        </View>

        {/* Client Information */}
        {quoteRequest.client && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client Information</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Company: </Text>
              {quoteRequest.client.company_name || "N/A"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Contact: </Text>
              {quoteRequest.client.contact_name || "N/A"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Email: </Text>
              {quoteRequest.client.email}
            </Text>
          </View>
        )}

        {/* Selected Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Features</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Feature</Text>
              <Text style={styles.tableCell}>Cost</Text>
            </View>
            {quoteRequest.selected_features.map((feature) => (
              <View key={feature.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{feature.name}</Text>
                <Text style={styles.tableCell}>
                  {formatCurrency(feature.base_cost)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pricing Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Summary</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <View style={[styles.pricingCard, { flex: 1 }]}>
              <Text style={styles.pricingLabel}>Total Project Cost</Text>
              <Text style={styles.pricingValue}>
                {formatCurrency(quoteRequest.estimated_cost)}
              </Text>
            </View>
            <View style={[styles.pricingCard, { flex: 1 }]}>
              <Text style={styles.pricingLabel}>Deposit Required</Text>
              <Text style={styles.pricingValue}>
                {formatCurrency(quoteRequest.deposit_amount)}
              </Text>
            </View>
            <View style={[styles.pricingCard, { flex: 1 }]}>
              <Text style={styles.pricingLabel}>Monthly Retainer</Text>
              <Text style={styles.pricingValue}>
                {formatCurrency(quoteRequest.monthly_retainer)}
              </Text>
            </View>
          </View>
        </View>

        {/* Project Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Timeline</Text>
          {quoteRequest.project_milestones.map((milestone, index) => (
            <View key={milestone.id} style={{ marginBottom: 10 }}>
              <Text style={styles.text}>
                <Text style={styles.bold}>
                  {index + 1}. {milestone.name}
                </Text>
              </Text>
              <Text style={styles.text}>{milestone.description}</Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Due Date: </Text>
                {formatDate(milestone.due_date)}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Status: </Text>
                {milestone.status}
              </Text>
            </View>
          ))}
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms and Conditions</Text>
          <Text style={styles.termsText}>
            • This quote is valid for 30 days from the date of issuance.
          </Text>
          <Text style={styles.termsText}>
            • A deposit of {formatCurrency(quoteRequest.deposit_amount)} is
            required to begin work.
          </Text>
          <Text style={styles.termsText}>
            • Monthly retainer payments of{" "}
            {formatCurrency(quoteRequest.monthly_retainer)} will be billed
            ongoing.
          </Text>
          <Text style={styles.termsText}>
            • All work is subject to our standard terms of service available at{" "}
            {companyWebsite}/terms.
          </Text>
          <Text style={styles.termsText}>
            • This quote includes AI-powered project planning and
            milestone-based delivery.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.bold}>{companyName}</Text> - Professional
            Software Development Services
          </Text>
          <Text style={styles.footerText}>
            <Text style={styles.footerLink}>{companyWebsite}</Text> |{" "}
            {companyEmail} | {companyPhone}
          </Text>
          <Text style={styles.footerText}>
            This quote was generated on {formatDate(quoteRequest.created_at)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuotePDF;
