import React from "react";
import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
const RecipePDF = ({ recipe }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10
    },
    title: {
      fontSize: 16,
      marginBottom: 10
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 8
    },
    text: {
      fontSize: 12,
      marginBottom: 5
    }
  });
  const stripHtmlAndDecodeEntities = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Strip HTML tags and decode HTML entities for instructions and summary
  const instructions = stripHtmlAndDecodeEntities(recipe.instructions);
  const summary = stripHtmlAndDecodeEntities(recipe.summary);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>{recipe.title}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text>Servings: {recipe.servings}</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Ready in: {recipe.readyInMinutes} minutes
          </Text>
        </View>
        <View style={styles.subtitle}>
          <Text>Summary:</Text>
        </View>
        <View style={styles.text}>
          <Text>{summary}</Text>
        </View>
        <View style={styles.subtitle}>
          <Text>Ingredients:</Text>
        </View>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <Text key={ingredient.id} style={styles.text}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </Text>
          ))}
        </ul>
        <View style={styles.subtitle}>
          <Text>Instructions:</Text>
        </View>
        <View style={styles.text}>
          <Text>{instructions}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecipePDF;
