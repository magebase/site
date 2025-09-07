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
    paddingBottom: 20,
    borderBottom: "2px solid #e2e8f0",
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
    color: "#1e293b",
  },
  companyInfo: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 5,
  },
  projectMeta: {
    fontSize: 10,
    color: "#475569",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  overviewCard: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "bold",
  },
  overviewValue: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "bold",
  },
  milestone: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  milestoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
  },
  milestoneStatus: {
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusPending: {
    backgroundColor: "#f59e0b", // amber-500
  },
  statusInProgress: {
    backgroundColor: "#3b82f6", // blue-500
  },
  statusCompleted: {
    backgroundColor: "#10b981", // emerald-500
  },
  statusOverdue: {
    backgroundColor: "#ef4444", // red-500
  },
  milestoneDescription: {
    fontSize: 11,
    color: "#475569",
    marginBottom: 8,
    lineHeight: 1.4,
  },
  milestoneDetail: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 3,
  },
  deliverablesList: {
    marginTop: 5,
    marginLeft: 10,
  },
  deliverableItem: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 2,
  },
  summarySection: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 11,
    color: "#1e293b",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 15,
  },
  footerText: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 2,
    textAlign: "center",
  },
  footerLink: {
    color: "#3b82f6",
    textDecoration: "underline",
  },
});

interface ProjectMilestone {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: string;
  milestone_data?: {
    duration_weeks?: number;
    deliverables?: string[];
    order?: number;
  };
}

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
  project_milestones: ProjectMilestone[];
  client?: {
    company_name: string;
    contact_name: string;
    email: string;
  };
  created_at: string;
}

interface TimelinePDFProps {
  quoteRequest: QuoteRequest;
  companyName?: string;
  companyWebsite?: string;
  companyEmail?: string;
  companyPhone?: string;
}

const TimelinePDF: React.FC<TimelinePDFProps> = ({
  quoteRequest,
  companyName = "Magebase",
  companyWebsite = "www.magebase.dev",
  companyEmail = "hello@magebase.dev",
  companyPhone = "+1 (555) 123-4567",
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "in_progress":
        return styles.statusInProgress;
      case "overdue":
        return styles.statusOverdue;
      default:
        return styles.statusPending;
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
          <Text style={styles.title}>Project Timeline</Text>
          <Text style={styles.subtitle}>{quoteRequest.project_name}</Text>
          <Text style={styles.projectMeta}>
            Generated on {formatDate(quoteRequest.created_at)}
          </Text>
        </View>

        {/* Project Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Overview</Text>
          <View style={styles.overviewCard}>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>Total Estimated Cost:</Text>
              <Text style={styles.overviewValue}>
                ${quoteRequest.estimated_cost?.toLocaleString() || "TBD"}
              </Text>
            </View>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>Deposit Required:</Text>
              <Text style={styles.overviewValue}>
                ${quoteRequest.deposit_amount?.toLocaleString() || "TBD"}
              </Text>
            </View>
            <View style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>Monthly Retainer:</Text>
              <Text style={styles.overviewValue}>
                ${quoteRequest.monthly_retainer?.toLocaleString() || "TBD"}
              </Text>
            </View>
          </View>
        </View>

        {/* Project Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Milestones</Text>
          {quoteRequest.project_milestones
            .sort(
              (a, b) =>
                (a.milestone_data?.order || 0) - (b.milestone_data?.order || 0),
            )
            .map((milestone) => (
              <View key={milestone.id} style={styles.milestone}>
                <View style={styles.milestoneHeader}>
                  <Text style={styles.milestoneTitle}>{milestone.name}</Text>
                  <Text
                    style={[
                      styles.milestoneStatus,
                      getStatusStyle(milestone.status),
                    ]}
                  >
                    {formatStatus(milestone.status)}
                  </Text>
                </View>

                <Text style={styles.milestoneDescription}>
                  {milestone.description}
                </Text>

                <Text style={styles.milestoneDetail}>
                  <Text style={styles.bold}>Due Date: </Text>
                  {formatDate(milestone.due_date)}
                </Text>

                {milestone.milestone_data?.duration_weeks && (
                  <Text style={styles.milestoneDetail}>
                    <Text style={styles.bold}>Duration: </Text>
                    {milestone.milestone_data.duration_weeks} weeks
                  </Text>
                )}

                {milestone.milestone_data?.deliverables &&
                  milestone.milestone_data.deliverables.length > 0 && (
                    <View>
                      <Text style={[styles.milestoneDetail, styles.bold]}>
                        Deliverables:
                      </Text>
                      <View style={styles.deliverablesList}>
                        {milestone.milestone_data.deliverables.map(
                          (deliverable, index) => (
                            <Text key={index} style={styles.deliverableItem}>
                              • {deliverable}
                            </Text>
                          ),
                        )}
                      </View>
                    </View>
                  )}
              </View>
            ))}
        </View>

        {/* Timeline Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline Summary</Text>
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Progress Overview</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Milestones:</Text>
              <Text style={styles.summaryValue}>
                {quoteRequest.project_milestones.length}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Completed:</Text>
              <Text style={styles.summaryValue}>
                {
                  quoteRequest.project_milestones.filter(
                    (m) => m.status === "completed",
                  ).length
                }
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>In Progress:</Text>
              <Text style={styles.summaryValue}>
                {
                  quoteRequest.project_milestones.filter(
                    (m) => m.status === "in_progress",
                  ).length
                }
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pending:</Text>
              <Text style={styles.summaryValue}>
                {
                  quoteRequest.project_milestones.filter(
                    (m) => m.status === "pending",
                  ).length
                }
              </Text>
            </View>
          </View>
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
            Timeline generated on {formatDate(quoteRequest.created_at)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TimelinePDF;
