import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

// Register fonts if needed
// Font.register({
//   family: 'Inter',
//   fonts: [
//     { src: '/fonts/Inter-Regular.ttf' },
//     { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    borderBottomStyle: "solid",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  clientInfo: {
    fontSize: 12,
    color: "#374151",
  },
  timelineContainer: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "flex-start",
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginTop: 5,
  },
  dayNumber: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  timelineConnector: {
    position: "absolute",
    left: 20,
    top: 45,
    width: 2,
    height: 60,
    backgroundColor: "#dbeafe",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  scopeText: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 12,
  },
  deliverablesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  deliverableItem: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: "#2563eb",
    borderRadius: 2,
    marginRight: 8,
    marginTop: 4,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
  },
  footerText: {
    fontSize: 10,
    color: "#9ca3af",
    textAlign: "center",
  },
  summarySection: {
    marginBottom: 30,
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    marginRight: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
});

interface TimelineItem {
  day: number;
  scope: string;
  deliverables: string[];
}

interface QuoteRequest {
  id: number;
  project_name: string;
  project_description: string;
  use_case: string;
  estimated_cost: number;
  monthly_retainer: number;
  deposit_amount: number;
  status: string;
  created_at: string;
  project_plan_json: {
    timeline?: TimelineItem[];
  };
  client: {
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
  };
  selected_features: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
  }>;
}

interface Props {
  quote_request: QuoteRequest;
}

const TimelinePdfGenerator: React.FC<Props> = ({ quote_request }) => {
  const timeline = quote_request.project_plan_json?.timeline || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{quote_request.project_name}</Text>
          <Text style={styles.subtitle}>Project Timeline & Deliverables</Text>
          <Text style={styles.clientInfo}>
            Client: {quote_request.client.company_name} | Contact:{" "}
            {quote_request.client.contact_name}
          </Text>
          <Text style={styles.clientInfo}>
            Generated: {format(new Date(), "MMMM dd, yyyy")}
          </Text>
        </View>

        {/* Project Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Project Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Use Case</Text>
              <Text style={styles.summaryValue}>{quote_request.use_case}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Days</Text>
              <Text style={styles.summaryValue}>{timeline.length} days</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Estimated Cost</Text>
              <Text style={styles.summaryValue}>
                ${quote_request.estimated_cost?.toLocaleString() || "TBD"}
              </Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {timeline.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.dayCircle}>
                <Text style={styles.dayNumber}>{item.day}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.dayTitle}>Day {item.day}</Text>
                <Text style={styles.scopeText}>{item.scope}</Text>
                {item.deliverables && item.deliverables.length > 0 && (
                  <>
                    <Text style={styles.deliverablesTitle}>Deliverables:</Text>
                    {item.deliverables.map((deliverable, idx) => (
                      <View key={idx} style={styles.deliverableItem}>
                        <View style={styles.bullet} />
                        <Text>{deliverable}</Text>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This timeline represents the planned project schedule. Actual
            timelines may vary based on project complexity and requirements.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TimelinePdfGenerator;
