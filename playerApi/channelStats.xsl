<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="text" indent="no"/>

<xsl:param name="app"/>
<xsl:param name="name"/>

<xsl:template match="/">
	<xsl:choose>
		<xsl:when test="//application[name=$app]/live/stream[name=$name] != ''">
			<xsl:variable name="viewers" select="count(//application[name=$app]/live/stream[name=$name]/client[not(publishing) and flashver])"/>
			<xsl:variable name="uptime" select="round(//application[name=$app]/live/stream[name=$name]/time div 1000)"/>
			<xsl:variable name="width" select="//application[name=$app]/live/stream[name=$name]/meta/video/width"/>
			<xsl:variable name="height" select="//application[name=$app]/live/stream[name=$name]/meta/video/height"/>
			<xsl:variable name="fps" select="//application[name=$app]/live/stream[name=$name]/meta/video/frame_rate"/>
			<xsl:variable name="bitrate" select="round(//application[name=$app]/live/stream[name=$name]/bw_video div 1000)"/>

			<xsl:text>{</xsl:text>
				<xsl:text>"name":"</xsl:text><xsl:value-of select="$name"/><xsl:text>",</xsl:text>
				<xsl:text>"viewers":</xsl:text><xsl:value-of select="$viewers"/><xsl:text>,</xsl:text>
				<xsl:text>"thumbnail":"/thumbnail/</xsl:text><xsl:value-of select="$name"/><xsl:text>.png",</xsl:text>
				<xsl:text>"uptime":"</xsl:text>
					<xsl:value-of select="concat(format-number($uptime div 3600, '00'), ':')"/>
					<xsl:value-of select="format-number(floor($uptime div 60) mod 60, '00')" />
					<xsl:value-of select="concat(':', format-number($uptime mod 60, '00'))" />
				<xsl:text>",</xsl:text>
				<xsl:text>"video":{</xsl:text>
					<xsl:text>"width":</xsl:text><xsl:value-of select="$width"/><xsl:text>,</xsl:text>
					<xsl:text>"height":</xsl:text><xsl:value-of select="$height"/><xsl:text>,</xsl:text>
					<xsl:text>"fps":</xsl:text><xsl:value-of select="$fps"/><xsl:text>,</xsl:text>
					<xsl:text>"bitrate":</xsl:text><xsl:value-of select="$bitrate"/>
				<xsl:text>}</xsl:text>
			<xsl:text>}</xsl:text>
		</xsl:when>

		<xsl:otherwise>
			<xsl:text>{}</xsl:text>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet>
