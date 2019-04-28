<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" indent="no"/>

	<xsl:param name="user"/>

	<xsl:template match="/">
		<xsl:variable name="pathLog" select="database/user[@id=$user]/log" />
		<xsl:text>{</xsl:text>
		<xsl:text>"user":"</xsl:text><xsl:value-of select="$user"/><xsl:text>",</xsl:text>
		<xsl:text>"dateStart":"</xsl:text><xsl:value-of select="$pathLog/dateStart"/><xsl:text>",</xsl:text>
		<xsl:text>"dateEnd":"</xsl:text><xsl:value-of select="$pathLog/dateEnd"/><xsl:text>",</xsl:text>
		<xsl:text>"order":[</xsl:text>
				<xsl:text>"</xsl:text><xsl:value-of select="$pathLog/mon"/><xsl:text>",</xsl:text>
				<xsl:text>"</xsl:text><xsl:value-of select="$pathLog/tue"/><xsl:text>",</xsl:text>
				<xsl:text>"</xsl:text><xsl:value-of select="$pathLog/wed"/><xsl:text>",</xsl:text>
				<xsl:text>"</xsl:text><xsl:value-of select="$pathLog/thr"/><xsl:text>",</xsl:text>
				<xsl:text>"</xsl:text><xsl:value-of select="$pathLog/fri"/><xsl:text>"</xsl:text>
			<xsl:text>]</xsl:text>
		<xsl:text>}</xsl:text>
	</xsl:template>

</xsl:stylesheet>