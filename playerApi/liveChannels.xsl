<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="text" indent="no"/>

	<xsl:param name="app"/>

	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="//application[name=$app]/live/stream != ''">
				<xsl:text>[</xsl:text>
				<xsl:for-each select="//application[name=$app]/live/stream">
					<xsl:sort select="count(client[not(publishing) and flashver])" data-type="number" order="descending"/>
					<xsl:variable name="channel" select="name"/>
					<xsl:variable name="viewers" select="count(client[not(publishing) and flashver])"/>

					<xsl:text>{</xsl:text>
						<xsl:text>"name":"</xsl:text><xsl:value-of select="$channel"/><xsl:text>",</xsl:text>
						<xsl:text>"viewers":</xsl:text><xsl:value-of select="$viewers"/><xsl:text>,</xsl:text>
						<xsl:text>"thumbnail":"/thumbnail/</xsl:text><xsl:value-of select="$channel"/><xsl:text>.png"</xsl:text>
					<xsl:text>}</xsl:text>
					<xsl:if test="position() != last()">,</xsl:if>
				</xsl:for-each>
				<xsl:text>]</xsl:text>
			</xsl:when>

			<xsl:otherwise>
				<xsl:text>[]</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
